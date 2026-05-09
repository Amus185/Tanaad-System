/**
 * GET    /api/students/:id — Get a single student
 * PUT    /api/students/:id — Update a student
 * DELETE /api/students/:id — Delete a student
 */
import { findOne, findMany, execute } from '../../_lib/db';
import type { Env, AuthData, StudentRow, StudentCourseRow } from '../../_lib/types';

// ─── GET /api/students/:id ──────────────────────────────────

export const onRequestGet: PagesFunction<Env, string, AuthData> = async (context) => {
  const id = context.params.id as string;

  const student = await findOne<StudentRow & { branch_name: string; teacher_name: string }>(
    context.env.DB,
    `SELECT s.*, b.name AS branch_name, t.name AS teacher_name
     FROM students s
     LEFT JOIN branches b ON b.id = s.branch_id
     LEFT JOIN teachers t ON t.id = s.teacher_id
     WHERE s.id = ?`,
    [id],
  );

  if (!student) {
    return Response.json({ error: 'Student not found' }, { status: 404 });
  }

  // Get enrollments
  const enrollments = await findMany<StudentCourseRow & { course_name: string }>(
    context.env.DB,
    `SELECT sc.*, c.name AS course_name
     FROM student_courses sc
     JOIN courses c ON c.id = sc.course_id
     WHERE sc.student_id = ?`,
    [id],
  );

  return Response.json({ ...student, enrollments });
};

// ─── PUT /api/students/:id ──────────────────────────────────

export const onRequestPut: PagesFunction<Env, string, AuthData> = async (context) => {
  const id = context.params.id as string;

  try {
    const body = await context.request.json<{
      name: string;
      phone: string;
      branch_id: number;
      teacher_id: number;
      course_ids: number[];
      class_time?: string;
    }>();

    // Check student exists
    const existing = await findOne<StudentRow>(
      context.env.DB,
      'SELECT id FROM students WHERE id = ?',
      [id],
    );
    if (!existing) {
      return Response.json({ error: 'Student not found' }, { status: 404 });
    }

    // Check phone uniqueness (excluding self)
    if (body.phone) {
      const phoneDup = await findOne<StudentRow>(
        context.env.DB,
        'SELECT id FROM students WHERE phone = ? AND id != ?',
        [body.phone.trim(), id],
      );
      if (phoneDup) {
        return Response.json({ error: 'Phone number already exists' }, { status: 409 });
      }
    }

    // Update student
    await execute(
      context.env.DB,
      'UPDATE students SET name = ?, phone = ?, branch_id = ?, teacher_id = ? WHERE id = ?',
      [body.name.trim(), body.phone.trim(), body.branch_id, body.teacher_id, id],
    );

    // Replace enrollments
    if (body.course_ids) {
      await execute(context.env.DB, 'DELETE FROM student_courses WHERE student_id = ?', [id]);
      for (const courseId of body.course_ids) {
        await execute(
          context.env.DB,
          'INSERT INTO student_courses (student_id, course_id, class_time) VALUES (?, ?, ?)',
          [id, courseId, body.class_time ?? null],
        );
      }
    }

    return Response.json({ message: 'Student updated successfully' });
  } catch (err) {
    console.error('Update student error:', err);
    return Response.json({ error: 'Failed to update student' }, { status: 500 });
  }
};

// ─── DELETE /api/students/:id ───────────────────────────────

export const onRequestDelete: PagesFunction<Env, string, AuthData> = async (context) => {
  const id = context.params.id as string;

  const existing = await findOne<StudentRow>(
    context.env.DB,
    'SELECT id FROM students WHERE id = ?',
    [id],
  );

  if (!existing) {
    return Response.json({ error: 'Student not found' }, { status: 404 });
  }

  // CASCADE handles student_courses cleanup
  await execute(context.env.DB, 'DELETE FROM students WHERE id = ?', [id]);

  return Response.json({ message: 'Student deleted successfully' });
};

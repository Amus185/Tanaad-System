/**
 * GET  /api/students      — List students (paginated, searchable)
 * POST /api/students      — Create a new student + enrollments
 *
 * Replaces Flask's students_bp index and add routes.
 */
import { findMany, execute, paginate } from '../../_lib/db';
import type { Env, AuthData, StudentRow } from '../../_lib/types';

// ─── GET /api/students ──────────────────────────────────────

export const onRequestGet: PagesFunction<Env, string, AuthData> = async (context) => {
  const url = new URL(context.request.url);
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const perPage = parseInt(url.searchParams.get('per_page') ?? '50', 10);
  const search = url.searchParams.get('search') ?? '';
  const courseFilter = url.searchParams.get('course') ?? '';
  const branchFilter = url.searchParams.get('branch') ?? '';
  const teacherFilter = url.searchParams.get('teacher') ?? '';

  let baseQuery = `
    SELECT DISTINCT s.id, s.name, s.phone, s.join_date,
           b.name AS branch_name, t.name AS teacher_name
    FROM students s
    LEFT JOIN branches b ON b.id = s.branch_id
    LEFT JOIN teachers t ON t.id = s.teacher_id
  `;
  let countQuery = `SELECT COUNT(DISTINCT s.id) AS total FROM students s`;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (courseFilter) {
    baseQuery += ` JOIN student_courses sc ON sc.student_id = s.id JOIN courses c ON c.id = sc.course_id`;
    countQuery += ` JOIN student_courses sc ON sc.student_id = s.id JOIN courses c ON c.id = sc.course_id`;
    conditions.push('c.name = ?');
    params.push(courseFilter);
  }
  if (search) {
    conditions.push('(s.name LIKE ? OR s.phone LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (branchFilter) {
    if (!baseQuery.includes('LEFT JOIN branches')) {
      // already joined
    }
    conditions.push('b.name = ?');
    params.push(branchFilter);
  }
  if (teacherFilter) {
    conditions.push('t.name = ?');
    params.push(teacherFilter);
  }

  if (conditions.length) {
    const whereClause = ' WHERE ' + conditions.join(' AND ');
    baseQuery += whereClause;
    countQuery += whereClause;
  }

  baseQuery += ' ORDER BY s.name';

  const result = await paginate<StudentRow & { branch_name: string; teacher_name: string }>(
    context.env.DB,
    baseQuery,
    countQuery,
    params,
    page,
    perPage,
  );

  return Response.json(result);
};

// ─── POST /api/students ─────────────────────────────────────

export const onRequestPost: PagesFunction<Env, string, AuthData> = async (context) => {
  try {
    const body = await context.request.json<{
      name: string;
      phone: string;
      branch_id: number;
      teacher_id: number;
      course_ids: number[];
      class_time?: string;
    }>();

    if (!body.name || !body.phone || !body.branch_id || !body.teacher_id) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check duplicate phone
    const existing = await context.env.DB.prepare(
      'SELECT id FROM students WHERE phone = ?',
    ).bind(body.phone.trim()).first();

    if (existing) {
      return Response.json({ error: 'Phone number already exists' }, { status: 409 });
    }

    // Insert student
    const insertResult = await execute(
      context.env.DB,
      'INSERT INTO students (name, phone, branch_id, teacher_id) VALUES (?, ?, ?, ?)',
      [body.name.trim(), body.phone.trim(), body.branch_id, body.teacher_id],
    );

    const studentId = insertResult.meta.last_row_id;

    // Insert enrollments
    if (body.course_ids?.length) {
      for (const courseId of body.course_ids) {
        await execute(
          context.env.DB,
          'INSERT INTO student_courses (student_id, course_id, class_time) VALUES (?, ?, ?)',
          [studentId, courseId, body.class_time ?? null],
        );
      }
    }

    return Response.json(
      { id: studentId, message: 'Student created successfully' },
      { status: 201 },
    );
  } catch (err) {
    console.error('Create student error:', err);
    return Response.json({ error: 'Failed to create student' }, { status: 500 });
  }
};

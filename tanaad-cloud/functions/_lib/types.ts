/**
 * Cloudflare Pages environment bindings and shared types.
 */

export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export interface JWTPayload {
  sub: number;       // user id
  username: string;
  role: string;
  iat: number;
  exp: number;
}

/** Data attached to context by middleware */
export interface AuthData {
  user: JWTPayload;
}

// ─── Database Row Types ─────────────────────────────────────

export interface UserRow {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: number; // 0 | 1
  last_login: string | null;
}

export interface UserProfileRow {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  bio: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export interface BranchRow {
  id: number;
  name: string;
}

export interface TeacherRow {
  id: number;
  name: string;
}

export interface CourseRow {
  id: number;
  name: string;
  teacher_id: number | null;
  is_active: number;
}

export interface StudentRow {
  id: number;
  name: string;
  phone: string | null;
  join_date: string;
  branch_id: number | null;
  teacher_id: number | null;
}

export interface StudentCourseRow {
  id: number;
  student_id: number;
  course_id: number;
  enrollment_date: string;
  class_time: string | null;
  status: string;
  completion_date: string | null;
}

export interface PaymentRow {
  id: number;
  enrollment_id: number | null;
  amount: number;
  payment_date: string;
  payment_method: string | null;
  receipt_number: string | null;
  fee_type: string;
  description: string | null;
  status: string;
}

export interface ExamRow {
  id: number;
  student_id: number;
  course_id: number;
  score: number;
  exam_date: string;
}

export interface GradeRow {
  id: number;
  student_id: number;
  course_id: number;
  grade: string | null;
  remarks: string | null;
  date_issued: string;
}

export interface CertificateRow {
  id: number;
  student_id: number;
  course_id: number;
  title: string | null;
  issued_date: string;
  certificate_number: string | null;
  download_url: string | null;
}

export interface AttendanceRow {
  id: number;
  enrollment_id: number;
  schedule_id: number | null;
  status: string;
  date: string;
  marked_at: string;
  notes: string | null;
}

// ─── API Response Types ─────────────────────────────────────

export interface ApiError {
  error: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

/**
 * Shared TypeScript interfaces — simplified schema.
 * No teachers, branches, attendance, certificates, grades.
 */

export interface User {
  id: number;
  username: string;
  email: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

export interface Course {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface Student {
  id: number;
  name: string;
  phone: string | null;
  join_date: string;
  created_at: string;
  enrollments?: Enrollment[];
}

export interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  course_name?: string;
  class_time: string | null;
  enrollment_date: string;
  status: string;
}

export interface Payment {
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

export interface Exam {
  id: number;
  student_id: number;
  course_id: number;
  score: number;
  exam_date: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface LoginRequest {
  username: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
}

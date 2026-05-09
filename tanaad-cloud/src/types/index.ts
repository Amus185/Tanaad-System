/**
 * Shared TypeScript interfaces for the React frontend.
 * Mirrors the backend row types but shaped for UI consumption.
 */

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: string;
  last_login?: string;
}

export interface Student {
  id: number;
  name: string;
  phone: string | null;
  join_date: string;
  branch_id: number | null;
  teacher_id: number | null;
  branch_name?: string;
  teacher_name?: string;
  enrollments?: Enrollment[];
}

export interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  course_name?: string;
  enrollment_date: string;
  class_time: string | null;
  status: string;
  completion_date: string | null;
}

export interface Teacher {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  teacher_id: number | null;
  is_active: boolean;
}

export interface Branch {
  id: number;
  name: string;
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

-- =====================================================
-- Tanaad College Management System — Simplified Schema
-- Target: Cloudflare D1 (SQLite)
-- Focus: Students, Courses, Payments, Exams
-- =====================================================

-- ===================== USERS (Auth) =====================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'admin',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_login TEXT
);

-- ===================== COURSES =====================
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ===================== STUDENTS =====================
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    join_date TEXT NOT NULL DEFAULT (date('now')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ===================== ENROLLMENTS =====================
CREATE TABLE IF NOT EXISTS student_courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    class_time TEXT,
    enrollment_date TEXT NOT NULL DEFAULT (date('now')),
    status TEXT NOT NULL DEFAULT 'active',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
);

-- ===================== PAYMENTS =====================
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enrollment_id INTEGER,
    amount REAL NOT NULL DEFAULT 0,
    payment_date TEXT NOT NULL DEFAULT (datetime('now')),
    payment_method TEXT DEFAULT 'Cash',
    receipt_number TEXT,
    fee_type TEXT NOT NULL DEFAULT 'course',
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Paid',
    FOREIGN KEY (enrollment_id) REFERENCES student_courses(id) ON DELETE SET NULL
);

-- ===================== EXAMS =====================
CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    score REAL NOT NULL,
    exam_date TEXT NOT NULL DEFAULT (date('now')),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ===================== SETTINGS =====================
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL DEFAULT ''
);

-- ===================== INDEXES =====================
CREATE INDEX IF NOT EXISTS idx_student_courses_student ON student_courses(student_id);
CREATE INDEX IF NOT EXISTS idx_student_courses_course ON student_courses(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_enrollment ON payments(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_payments_fee_type ON payments(fee_type);
CREATE INDEX IF NOT EXISTS idx_exams_student ON exams(student_id);
CREATE INDEX IF NOT EXISTS idx_exams_course ON exams(course_id);

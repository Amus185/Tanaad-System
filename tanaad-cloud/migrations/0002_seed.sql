-- =====================================================
-- Seed Data for Tanaad College
-- =====================================================

-- Admin user (password: admin123 — Werkzeug PBKDF2 format)
INSERT OR IGNORE INTO users (username, password_hash, email, role)
VALUES ('admin', 'pbkdf2:sha256:600000$salt$hash', 'admin@tanaad.edu', 'admin');

-- Courses
INSERT OR IGNORE INTO courses (name) VALUES ('A+');
INSERT OR IGNORE INTO courses (name) VALUES ('A++');
INSERT OR IGNORE INTO courses (name) VALUES ('Multimedia');
INSERT OR IGNORE INTO courses (name) VALUES ('Web Design');
INSERT OR IGNORE INTO courses (name) VALUES ('Javascript');
INSERT OR IGNORE INTO courses (name) VALUES ('Networking');
INSERT OR IGNORE INTO courses (name) VALUES ('Database');
INSERT OR IGNORE INTO courses (name) VALUES ('Programming');
INSERT OR IGNORE INTO courses (name) VALUES ('Basic Computer Application');

-- Settings
INSERT OR IGNORE INTO settings (key, value) VALUES ('college_name', 'Tanaad Computer Science College');
INSERT OR IGNORE INTO settings (key, value) VALUES ('college_email', 'info@tanaad.edu');
INSERT OR IGNORE INTO settings (key, value) VALUES ('college_phone', '+252 61 000 0000');
INSERT OR IGNORE INTO settings (key, value) VALUES ('college_address', 'Hargeisa, Somaliland');
INSERT OR IGNORE INTO settings (key, value) VALUES ('academic_year', '2025-2026');
INSERT OR IGNORE INTO settings (key, value) VALUES ('course_fee', '15');
INSERT OR IGNORE INTO settings (key, value) VALUES ('certificate_fee', '65');
INSERT OR IGNORE INTO settings (key, value) VALUES ('app_fee', '10');

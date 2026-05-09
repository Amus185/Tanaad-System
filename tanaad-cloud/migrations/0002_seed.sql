-- Seed data for Tanaad Computer Science College
-- Matches the default data from Flask's initialize_database()

-- Default teachers
INSERT OR IGNORE INTO teachers (name) VALUES ('Eng Mohamed');
INSERT OR IGNORE INTO teachers (name) VALUES ('Eng Mubarik');
INSERT OR IGNORE INTO teachers (name) VALUES ('Eng Ahmed');

-- Default courses
INSERT OR IGNORE INTO courses (name) VALUES ('A+');
INSERT OR IGNORE INTO courses (name) VALUES ('A++');
INSERT OR IGNORE INTO courses (name) VALUES ('Multimedia');
INSERT OR IGNORE INTO courses (name) VALUES ('Web Design');
INSERT OR IGNORE INTO courses (name) VALUES ('Javascript');
INSERT OR IGNORE INTO courses (name) VALUES ('Networking');
INSERT OR IGNORE INTO courses (name) VALUES ('Database');
INSERT OR IGNORE INTO courses (name) VALUES ('Programming');
INSERT OR IGNORE INTO courses (name) VALUES ('Basic Computer Application');

-- Default branches
INSERT OR IGNORE INTO branches (name) VALUES ('Main Campus');
INSERT OR IGNORE INTO branches (name) VALUES ('Branch 2');
INSERT OR IGNORE INTO branches (name) VALUES ('Gebilay Campus');

-- Default class times
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('8:00-9:00');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('9:00-10:00');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('10:00-11:00');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('14:30-15:30');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('16:00-17:00');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('17:00-18:30');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('18:30-19:30');
INSERT OR IGNORE INTO class_times (time_slot) VALUES ('19:30-20:30');

-- Default admin user (password: 1122, hashed with Werkzeug PBKDF2)
-- NOTE: Run the seed script to generate a proper hash, or use createuser.py first
-- then export the hash. This is a placeholder — replace before production.

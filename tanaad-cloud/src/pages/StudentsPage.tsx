import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Student, PaginatedResponse, Course, Teacher, Branch } from '@/types';

// Mock data
const MOCK_STUDENTS: Student[] = [
  { id: 1, name: 'Ahmed Ali', phone: '0612345678', join_date: '2026-01-15', branch_id: 1, teacher_id: 1, branch_name: 'Main Campus', teacher_name: 'Eng Mohamed', enrollments: [{ id: 1, student_id: 1, course_id: 1, course_name: 'A+', enrollment_date: '2026-01-15', class_time: '8:00-9:00', status: 'active', completion_date: null }, { id: 2, student_id: 1, course_id: 3, course_name: 'Multimedia', enrollment_date: '2026-01-15', class_time: '8:00-9:00', status: 'active', completion_date: null }, { id: 3, student_id: 1, course_id: 5, course_name: 'Javascript', enrollment_date: '2026-01-15', class_time: '8:00-9:00', status: 'active', completion_date: null }] },
  { id: 2, name: 'Fatima Hassan', phone: '0623456789', join_date: '2026-02-01', branch_id: 1, teacher_id: 2, branch_name: 'Main Campus', teacher_name: 'Eng Mubarik', enrollments: [{ id: 4, student_id: 2, course_id: 2, course_name: 'A++', enrollment_date: '2026-02-01', class_time: '9:00-10:00', status: 'active', completion_date: null }] },
  { id: 3, name: 'Mohamed Abdi', phone: '0634567890', join_date: '2026-03-10', branch_id: 3, teacher_id: 3, branch_name: 'Gebilay Campus', teacher_name: 'Eng Ahmed', enrollments: [{ id: 5, student_id: 3, course_id: 4, course_name: 'Web Design', enrollment_date: '2026-03-10', class_time: '10:00-11:00', status: 'active', completion_date: null }] },
];
const COURSES = ['A+','A++','Multimedia','Web Design','Javascript','Networking','Database','Programming','Basic Computer Application'];
const CLASS_TIMES = ['8:00-9:00','9:00-10:00','10:00-11:00','14:30-15:30','16:00-17:00','17:00-18:30','18:30-19:30','19:30-20:30'];
const TEACHERS = ['Eng Mohamed','Eng Mubarik','Eng Ahmed'];
const BRANCHES = ['Main Campus','Branch 2','Gebilay Campus'];

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [classTimeFilter, setClassTimeFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [expandedCourses, setExpandedCourses] = useState<Record<number, boolean>>({});

  // Filter students locally for mock
  const filtered = MOCK_STUDENTS.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.phone?.includes(search)) return false;
    if (courseFilter && !s.enrollments?.some((e) => e.course_name === courseFilter)) return false;
    if (teacherFilter && s.teacher_name !== teacherFilter) return false;
    if (branchFilter && s.branch_name !== branchFilter) return false;
    if (classTimeFilter && !s.enrollments?.some((e) => e.class_time === classTimeFilter)) return false;
    return true;
  });

  function handleDelete(id: number, name: string) {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      alert(`Student ${name} deleted (mock)`);
    }
  }

  function clearFilters() {
    setSearch(''); setCourseFilter(''); setClassTimeFilter('');
    setTeacherFilter(''); setBranchFilter('');
  }

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Student Management</h1>
          <p>Manage all student records and information</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/students/add" className="btn btn-primary">
            <i className="fas fa-plus"></i> Add New
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-grid">
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
            <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-control" style={{ width: '100%', paddingLeft: '2.5rem' }} />
          </div>
          <select className="form-control" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="">All Courses</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-control" value={classTimeFilter} onChange={(e) => setClassTimeFilter(e.target.value)}>
            <option value="">All Class Times</option>
            {CLASS_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="form-control" value={teacherFilter} onChange={(e) => setTeacherFilter(e.target.value)}>
            <option value="">All Teachers</option>
            {TEACHERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="form-control" value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
            <option value="">All Branches</option>
            {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
            <button className="btn btn-success"><i className="fas fa-filter"></i> Apply</button>
            <button className="btn btn-secondary" onClick={clearFilters}><i className="fas fa-sync"></i> Clear</button>
          </div>
        </div>
      </div>

      {/* Student Records */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Student Records</h3>
          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
            Showing {filtered.length} students
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Contact</th>
                <th>Branch</th>
                <th>Course</th>
                <th>Teacher</th>
                <th>Class Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="empty-state">
                    <i className="fas fa-user-graduate"></i>
                    <h4>No students found</h4>
                    <p>Add new students or adjust your filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((student) => {
                  const visibleCourses = (student.enrollments || []).slice(0, 2);
                  const hiddenCourses = (student.enrollments || []).slice(2);
                  const isExpanded = expandedCourses[student.id];
                  const classTimes = [...new Set((student.enrollments || []).map((e) => e.class_time).filter(Boolean))];

                  return (
                    <tr key={student.id}>
                      <td>STU-{String(student.id).padStart(5, '0')}</td>
                      <td>
                        <div className="user-cell">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`} alt={student.name} />
                          <div>
                            <div className="name">{student.name}</div>
                            <div className="sub">{student.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td>{student.phone}</td>
                      <td>{student.branch_name || 'Undeclared'}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                          {visibleCourses.map((e) => (
                            <span key={e.id} className="course-pill">{e.course_name}</span>
                          ))}
                          {hiddenCourses.length > 0 && (
                            <>
                              <button
                                onClick={() => setExpandedCourses((prev) => ({ ...prev, [student.id]: !prev[student.id] }))}
                                style={{
                                  background: '#f0f0f0', color: '#555', width: 24, height: 24,
                                  borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
                                  justifyContent: 'center', cursor: 'pointer', fontSize: '0.7rem',
                                  border: 'none', marginLeft: 4,
                                }}
                              >
                                {isExpanded ? '-' : `+${hiddenCourses.length}`}
                              </button>
                              {isExpanded && hiddenCourses.map((e) => (
                                <span key={e.id} className="course-pill">{e.course_name}</span>
                              ))}
                            </>
                          )}
                        </div>
                      </td>
                      <td>{student.teacher_name || 'N/A'}</td>
                      <td>{classTimes.length > 0 ? classTimes.join(', ') : 'Not set'}</td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/students/edit/${student.id}`} className="btn btn-warning">
                            <i className="fas fa-edit"></i> Edit
                          </Link>
                          <button className="btn btn-danger" onClick={() => handleDelete(student.id, student.name)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

const COURSES = ['A+','A++','Multimedia','Web Design','Javascript','Networking','Database','Programming','Basic Computer Application'];
const CLASS_TIMES = ['8:00-9:00','9:00-10:00','10:00-11:00','14:30-15:30','16:00-17:00','17:00-18:30','18:30-19:30','19:30-20:30'];

const MOCK_STUDENTS = [
  { id: 1, name: 'Ahmed Ali', phone: '0612345678', join_date: '2026-01-15', enrollments: [
    { id: 1, course_name: 'A+', class_time: '8:00-9:00' },
    { id: 2, course_name: 'Multimedia', class_time: '8:00-9:00' },
    { id: 3, course_name: 'Javascript', class_time: '9:00-10:00' },
  ]},
  { id: 2, name: 'Fatima Hassan', phone: '0623456789', join_date: '2026-02-01', enrollments: [
    { id: 4, course_name: 'A++', class_time: '9:00-10:00' },
  ]},
  { id: 3, name: 'Mohamed Abdi', phone: '0634567890', join_date: '2026-03-10', enrollments: [
    { id: 5, course_name: 'Web Design', class_time: '10:00-11:00' },
  ]},
];

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [classTimeFilter, setClassTimeFilter] = useState('');
  const [expandedCourses, setExpandedCourses] = useState<Record<number, boolean>>({});

  const filtered = MOCK_STUDENTS.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.phone?.includes(search)) return false;
    if (courseFilter && !s.enrollments?.some((e) => e.course_name === courseFilter)) return false;
    if (classTimeFilter && !s.enrollments?.some((e) => e.class_time === classTimeFilter)) return false;
    return true;
  });

  function handleDelete(id: number, name: string) {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      alert(`Student ${name} deleted (mock)`);
    }
  }

  return (
    <>
      <div className="page-header">
        <div><h1>Student Management</h1><p>Manage all student records</p></div>
        <Link to="/students/add" className="btn btn-primary"><i className="fas fa-plus"></i> Add New</Link>
      </div>

      <div className="filter-section">
        <div className="filter-grid">
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
            <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-control" style={{ width: '100%', paddingLeft: '2.5rem' }} />
          </div>
          <select className="form-control" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="">All Courses</option>
            {COURSES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="form-control" value={classTimeFilter} onChange={(e) => setClassTimeFilter(e.target.value)}>
            <option value="">All Class Times</option>
            {CLASS_TIMES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-success"><i className="fas fa-filter"></i> Apply</button>
            <button className="btn btn-secondary" onClick={() => { setSearch(''); setCourseFilter(''); setClassTimeFilter(''); }}>
              <i className="fas fa-sync"></i> Clear
            </button>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Student Records</h3>
          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Showing {filtered.length} students</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Student</th><th>Contact</th><th>Courses</th><th>Class Time</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="empty-state"><i className="fas fa-user-graduate"></i><h4>No students found</h4><p>Add new students or adjust your filters</p></td></tr>
              ) : filtered.map((student) => {
                const visible = student.enrollments.slice(0, 2);
                const hidden = student.enrollments.slice(2);
                const isExpanded = expandedCourses[student.id];
                const classTimes = [...new Set(student.enrollments.map((e) => e.class_time).filter(Boolean))];
                return (
                  <tr key={student.id}>
                    <td>STU-{String(student.id).padStart(5, '0')}</td>
                    <td>
                      <div className="user-cell">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`} alt="" />
                        <div><div className="name">{student.name}</div><div className="sub">{student.phone}</div></div>
                      </div>
                    </td>
                    <td>{student.phone}</td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                        {visible.map((e) => <span key={e.id} className="course-pill">{e.course_name}</span>)}
                        {hidden.length > 0 && (
                          <>
                            <button onClick={() => setExpandedCourses((p) => ({ ...p, [student.id]: !p[student.id] }))}
                              style={{ background: '#f0f0f0', color: '#555', width: 24, height: 24, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.7rem', border: 'none' }}>
                              {isExpanded ? '-' : `+${hidden.length}`}
                            </button>
                            {isExpanded && hidden.map((e) => <span key={e.id} className="course-pill">{e.course_name}</span>)}
                          </>
                        )}
                      </div>
                    </td>
                    <td>{classTimes.length > 0 ? classTimes.join(', ') : 'Not set'}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/students/edit/${student.id}`} className="btn btn-warning"><i className="fas fa-edit"></i> Edit</Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(student.id, student.name)}><i className="fas fa-trash"></i> Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

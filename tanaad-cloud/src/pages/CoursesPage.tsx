import { useState } from 'react';

const MOCK_COURSES = [
  { id: 1, name: 'A+', is_active: true },
  { id: 2, name: 'A++', is_active: true },
  { id: 3, name: 'Multimedia', is_active: true },
  { id: 4, name: 'Web Design', is_active: true },
  { id: 5, name: 'Javascript', is_active: true },
  { id: 6, name: 'Networking', is_active: false },
  { id: 7, name: 'Database', is_active: true },
  { id: 8, name: 'Programming', is_active: true },
  { id: 9, name: 'Basic Computer Application', is_active: true },
];

export function CoursesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState<typeof MOCK_COURSES[0] | null>(null);
  const [courses, setCourses] = useState(MOCK_COURSES);

  const filtered = courses.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter === 'active' && !c.is_active) return false;
    if (statusFilter === 'inactive' && c.is_active) return false;
    return true;
  });

  function toggleActive(id: number) {
    setCourses((prev) => prev.map((c) => c.id === id ? { ...c, is_active: !c.is_active } : c));
  }

  return (
    <>
      <div className="page-header">
        <div><h1>Course Management</h1><p>View and manage all courses</p></div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
            <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-control" style={{ paddingLeft: '2.5rem', borderRadius: '30px', width: 220 }} />
          </div>
          <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Available Courses</h3>
          <button className="btn btn-primary" style={{ background: '#0033A0' }} onClick={() => { setEditCourse(null); setShowModal(true); }}>
            <i className="fas fa-plus"></i> Add Course
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Course Name</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="empty-state"><i className="fas fa-book-open"></i><h4>No courses found</h4></td></tr>
              ) : filtered.map((course) => (
                <tr key={course.id}>
                  <td>CRS-{String(course.id).padStart(3, '0')}</td>
                  <td style={{ fontWeight: 600 }}>{course.name}</td>
                  <td><span className={`status-badge ${course.is_active ? 'status-active' : 'status-inactive'}`}>{course.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-warning" onClick={() => { setEditCourse(course); setShowModal(true); }}><i className="fas fa-edit"></i> Edit</button>
                      <button className={`btn ${course.is_active ? 'btn-danger' : 'btn-success'}`} onClick={() => toggleActive(course.id)}>
                        <i className={`fas ${course.is_active ? 'fa-times-circle' : 'fa-check-circle'}`}></i>
                        {course.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: '2rem', width: '90%', maxWidth: 450, position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', color: '#95a5a6', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ color: '#0033A0', marginBottom: '1.5rem' }}>{editCourse ? 'Edit Course' : 'Add New Course'}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Course Name</label>
              <input className="form-control" style={{ width: '100%' }} defaultValue={editCourse?.name || ''} placeholder="Enter course name" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" defaultChecked={editCourse?.is_active ?? true} style={{ width: 18, height: 18, accentColor: '#00A54F' }} /> Active
              </label>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-success" onClick={() => { setShowModal(false); }}><i className="fas fa-save"></i> {editCourse ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

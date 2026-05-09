import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_TEACHERS = [
  { id: 1, name: 'Eng Mohamed', courses: 4, students: 85 },
  { id: 2, name: 'Eng Mubarik', courses: 3, students: 72 },
  { id: 3, name: 'Eng Ahmed', courses: 5, students: 88 },
];

export function TeachersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = MOCK_TEACHERS.filter((t) =>
    !search || t.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function handleDelete(id: number, name: string) {
    if (confirm(`Are you sure you want to delete teacher "${name}"?`)) {
      alert(`Teacher ${name} deleted (mock)`);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Teacher Management</h1>
          <p>View and manage all teachers</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <form onSubmit={(e) => { e.preventDefault(); }} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
              <input type="text" placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="form-control" style={{ paddingLeft: '2.5rem', borderRadius: '30px', width: 220 }} />
            </div>
            <button type="submit" className="btn btn-success"><i className="fas fa-search"></i> Search</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSearch('')}><i className="fas fa-sync-alt"></i> Reset</button>
          </form>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Teacher Records</h3>
          <div className="card-actions">
            <Link to="/teachers/add" className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New Teacher
            </Link>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Courses</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <h4>No teachers found</h4>
                    <p>Add new teachers to get started</p>
                  </td>
                </tr>
              ) : (
                paginated.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>TC-{String(teacher.id).padStart(5, '0')}</td>
                    <td style={{ fontWeight: 600 }}>{teacher.name}</td>
                    <td>{teacher.courses}</td>
                    <td>{teacher.students}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/teachers/${teacher.id}`} className="btn btn-info" title="View Details">
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link to={`/teachers/edit/${teacher.id}`} className="btn btn-warning" title="Edit">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button className="btn btn-danger" title="Delete" onClick={() => handleDelete(teacher.id, teacher.name)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className={`page-link${page <= 1 ? ' disabled' : ''}`} onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
              Previous
            </button>
            <span style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Page {page} of {totalPages}</span>
            <button className={`page-link${page >= totalPages ? ' disabled' : ''}`} onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Link to="/teachers/add" className="fab" title="Add New Teacher">
        <i className="fas fa-plus"></i>
      </Link>
    </>
  );
}

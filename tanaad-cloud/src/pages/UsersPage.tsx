import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_USERS = [
  { id: 1, username: 'admin', email: 'admin@tanaad.edu', role: 'Administrator', is_active: true, last_login: '2026-05-07 14:30' },
  { id: 2, username: 'finance1', email: 'finance@tanaad.edu', role: 'Finance', is_active: true, last_login: '2026-05-06 09:15' },
  { id: 3, username: 'teacher1', email: 'teacher@tanaad.edu', role: 'Teacher', is_active: false, last_login: '2026-04-20 11:00' },
];

export function UsersPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_USERS.filter((u) =>
    !search || u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div><h1>User Management</h1><p>Manage system users and permissions</p></div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-control" style={{ paddingLeft: '2.5rem', borderRadius: '30px', width: 220 }} />
          </div>
          <Link to="/users/add" className="btn btn-primary"><i className="fas fa-plus"></i> Add User</Link>
        </div>
      </div>
      <div className="content-card">
        <div className="card-header"><h3 className="card-title">System Users</h3></div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td><div className="user-cell"><img src={`https://ui-avatars.com/api/?name=${u.username}&background=3498db&color=fff`} alt="" /><div className="name">{u.username}</div></div></td>
                  <td>{u.email}</td>
                  <td><span className="fee-type-badge">{u.role}</span></td>
                  <td><span className={`status-badge ${u.is_active ? 'status-active' : 'status-inactive'}`}>{u.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td style={{ fontSize: '0.85rem', color: '#95a5a6' }}>{u.last_login}</td>
                  <td><div className="action-buttons">
                    <Link to={`/users/edit/${u.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                    <button className="btn btn-danger" onClick={() => confirm(`Delete ${u.username}?`)}><i className="fas fa-trash"></i></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

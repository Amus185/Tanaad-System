import { useState } from 'react';
import { Link } from 'react-router-dom';

const FEE_TYPES: Record<string, number> = { course: 15, certificate: 65, app: 10 };
const METHODS = ['Cash', 'Bank Transfer', 'Mobile Money'];
const COURSES = ['A+','A++','Multimedia','Web Design','Javascript','Networking','Database','Programming'];

const MOCK_PAYMENTS = [
  { id: 1, student_name: 'Ahmed Ali', phone: '0612345678', courses: ['A+', 'Multimedia'], total: 30, balance: 0, method: 'Cash', status: 'Paid', fee_type: 'course', date: '2026-05-01' },
  { id: 2, student_name: 'Fatima Hassan', phone: '0623456789', courses: ['A++'], total: 15, balance: 0, method: 'Mobile Money', status: 'Paid', fee_type: 'course', date: '2026-05-02' },
  { id: 3, student_name: 'Mohamed Abdi', phone: '0634567890', courses: ['Web Design'], total: 10, balance: 5, method: 'Cash', status: 'Pending', fee_type: 'course', date: '2026-05-03' },
];

export function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [feeTypeFilter, setFeeTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = MOCK_PAYMENTS.filter((p) => {
    if (search && !p.student_name.toLowerCase().includes(search.toLowerCase()) && !p.phone.includes(search)) return false;
    if (courseFilter && !p.courses.includes(courseFilter)) return false;
    if (methodFilter && p.method !== methodFilter) return false;
    if (feeTypeFilter && p.fee_type !== feeTypeFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  function clearFilters() {
    setSearch(''); setMonthFilter(''); setCourseFilter('');
    setMethodFilter(''); setFeeTypeFilter(''); setStatusFilter('');
  }

  function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this payment? This action cannot be undone.')) {
      alert(`Payment ${id} deleted (mock)`);
    }
  }

  return (
    <>
      <div className="page-header">
        <div><h1>Payment Management</h1><p>View and manage all payment transactions</p></div>
        <Link to="/payments/add" className="btn btn-primary"><i className="fas fa-plus"></i> Add New</Link>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-grid">
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
            <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-control" style={{ width: '100%', paddingLeft: '2.5rem' }} />
          </div>
          <input type="month" className="form-control" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
          <select className="form-control" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="">All Courses</option>
            {COURSES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="form-control" value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
            <option value="">All Methods</option>
            {METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select className="form-control" value={feeTypeFilter} onChange={(e) => setFeeTypeFilter(e.target.value)}>
            <option value="">All Fee Types</option>
            {Object.entries(FEE_TYPES).map(([ft, amt]) => (
              <option key={ft} value={ft}>{ft.charAt(0).toUpperCase() + ft.slice(1)} (${amt})</option>
            ))}
          </select>
          <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          <button className="btn btn-success"><i className="fas fa-filter"></i> Apply</button>
          <button className="btn btn-secondary" onClick={clearFilters}><i className="fas fa-sync"></i> Clear</button>
          <button className="btn btn-success"><i className="fas fa-file-export"></i> Export</button>
        </div>
      </div>

      {/* Payment Records */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Payment Records</h3>
          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Showing {filtered.length} payments</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Phone</th>
                <th>Courses</th>
                <th>Amount</th>
                <th>Balance</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="empty-state">
                    <i className="fas fa-money-bill-wave"></i>
                    <h4>No payments found</h4>
                    <p>Add new payments or adjust your filters</p>
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id}>
                  <td>PAY-{String(p.id).padStart(5, '0')}</td>
                  <td style={{ fontWeight: 600 }}>{p.student_name}</td>
                  <td>{p.phone}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {p.courses.map((c) => <span key={c} className="course-pill">{c}</span>)}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#00A54F' }}>${p.total.toFixed(2)}</td>
                  <td style={{ fontWeight: 600, color: p.balance > 0 ? '#e74c3c' : '#27ae60' }}>
                    ${p.balance.toFixed(2)}
                  </td>
                  <td><span className="fee-type-badge">{p.method}</span></td>
                  <td>
                    <span className={`status-badge ${p.status === 'Paid' ? 'status-active' : 'status-inactive'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#95a5a6' }}>{p.date}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/payments/edit/${p.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(p.id)}><i className="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAB */}
      <Link to="/payments/add" className="fab" title="Add New Payment"><i className="fas fa-plus"></i></Link>
    </>
  );
}

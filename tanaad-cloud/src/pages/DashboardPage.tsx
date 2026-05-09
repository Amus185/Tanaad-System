import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const FEE_TYPES: Record<string, number> = { course: 15, certificate: 65, app: 10 };

export function DashboardPage() {
  const { user } = useAuth();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [feeTypeFilter, setFeeTypeFilter] = useState('');

  const statCards = [
    { title: 'Total Students', value: 245, icon: 'fas fa-users', color: '#00A54F' },
    { title: 'Active Courses', value: 9, icon: 'fas fa-book', color: '#f39c12' },
    { title: "Today's Expected", value: '$3,675.00', icon: 'fas fa-dollar-sign', color: '#27ae60' },
    { title: "Today's Paid", value: '$1,250.00', icon: 'fas fa-check-circle', color: '#1abc9c' },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, {user?.username || 'Admin'}! Here's what's happening today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#95a5a6' }}></i>
            <input type="text" placeholder="Search..." className="form-control" style={{ paddingLeft: '2.5rem', borderRadius: '30px', width: 220 }} />
          </div>
          <img src={`https://ui-avatars.com/api/?name=${user?.username || 'Admin'}&background=3498db&color=fff`}
            alt="User" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #00A54F' }} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-cards">
        {statCards.map((card) => (
          <div className="stat-card" key={card.title}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#95a5a6', fontWeight: 500 }}>{card.title}</span>
              <div className="card-icon" style={{ background: card.color }}><i className={card.icon}></i></div>
            </div>
            <div className="card-value">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Fee Breakdown */}
      <div className="fee-breakdown">
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0033A0', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-receipt" style={{ color: '#00A54F' }}></i> Fee Structure
        </div>
        <div className="fee-breakdown-grid">
          {Object.entries(FEE_TYPES).map(([ft, amt]) => (
            <div className="fee-item" key={ft}>
              <span className="fee-label">{ft.charAt(0).toUpperCase() + ft.slice(1)} Fee</span>
              <span className="fee-value">${amt} per student</span>
            </div>
          ))}
          <div className="fee-item">
            <span className="fee-label">Outstanding</span>
            <span className="fee-value" style={{ color: '#e74c3c' }}>$2,425.00</span>
          </div>
        </div>
      </div>

      {/* Today's Payments */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Today's Payments</h3>
          <a href="/payments" className="btn btn-primary"><i className="fas fa-file-export"></i> View All</a>
        </div>

        <div className="filter-section">
          <div className="filter-grid">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Date:</label>
              <input type="date" className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Fee Type:</label>
              <select className="form-control" value={feeTypeFilter} onChange={(e) => setFeeTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="course">Course Fee</option>
                <option value="certificate">Certificate Fee</option>
                <option value="app">App Fee</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ background: '#0033A0' }}><i className="fas fa-filter"></i> Filter</button>
            <button className="btn btn-secondary" onClick={() => { setDateFilter(new Date().toISOString().split('T')[0]); setFeeTypeFilter(''); }}>
              <i className="fas fa-times"></i> Clear
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Student</th><th>Amount</th><th>Method</th><th>Fee Type</th><th>Time</th></tr></thead>
            <tbody>
              <tr>
                <td colSpan={5} className="empty-state">
                  <i className="fas fa-receipt"></i>
                  <h4>No payments recorded today</h4>
                  <p>Payments will appear here as they are recorded</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

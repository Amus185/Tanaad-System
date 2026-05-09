import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const FEE_TYPES: Record<string, number> = { course: 15, certificate: 65, app: 10 };

export function DashboardPage() {
  const { user } = useAuth();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [feeTypeFilter, setFeeTypeFilter] = useState('');

  const statCards = [
    { title: 'Total Students', value: '245', icon: 'fas fa-users', color: '#00A54F', bg: 'rgba(0,165,79,0.08)' },
    { title: 'Active Courses', value: '9', icon: 'fas fa-book', color: '#f39c12', bg: 'rgba(243,156,18,0.08)' },
    { title: "Today's Expected", value: '$3,675', icon: 'fas fa-dollar-sign', color: '#0033A0', bg: 'rgba(0,51,160,0.08)' },
    { title: "Today's Paid", value: '$1,250', icon: 'fas fa-check-circle', color: '#1abc9c', bg: 'rgba(26,188,156,0.08)' },
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1.25rem 2rem', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', color: '#0033A0', fontWeight: 700, margin: 0 }}>Dashboard Overview</h1>
          <p style={{ fontSize: '0.9rem', color: '#95a5a6', margin: '4px 0 0' }}>Welcome back, {user?.username || 'Admin'}! Here's what's happening today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#bdc3c7' }}></i>
            <input type="text" placeholder="Search..." style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #e0e0e0', borderRadius: 25, fontSize: '0.85rem', width: 200, outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <img src={`https://ui-avatars.com/api/?name=${user?.username || 'Admin'}&background=0033A0&color=fff&size=40`} alt="" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #00A54F' }} />
        </div>
      </div>

      {/* Stat Cards — 4 columns full width */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {statCards.map((card) => (
          <div key={card.title} style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#7f8c8d', fontWeight: 500 }}>{card.title}</span>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={card.icon} style={{ color: card.color, fontSize: '1.1rem' }}></i>
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0033A0', letterSpacing: '-0.5px' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Fee Structure — full width row */}
      <div style={{ background: '#fff', borderRadius: 10, padding: '1.25rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0033A0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-receipt" style={{ color: '#00A54F' }}></i> Fee Structure
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {Object.entries(FEE_TYPES).map(([ft, amt]) => (
            <div key={ft} style={{ padding: '1rem', background: '#f8f9fa', borderRadius: 8, borderLeft: '3px solid #00A54F' }}>
              <div style={{ fontSize: '0.75rem', color: '#95a5a6', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>{ft} Fee</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0033A0', marginTop: 4 }}>${amt}</div>
              <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: 2 }}>per student</div>
            </div>
          ))}
          <div style={{ padding: '1rem', background: '#fff5f5', borderRadius: 8, borderLeft: '3px solid #e74c3c' }}>
            <div style={{ fontSize: '0.75rem', color: '#95a5a6', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>Outstanding</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e74c3c', marginTop: 4 }}>$2,425</div>
            <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: 2 }}>to collect</div>
          </div>
        </div>
      </div>

      {/* Today's Payments */}
      <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0033A0', margin: 0 }}>Today's Payments</h3>
          <Link to="/payments" className="btn btn-primary"><i className="fas fa-list"></i> View All</Link>
        </div>

        {/* Filters */}
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 8, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#7f8c8d', fontWeight: 500 }}>Date:</label>
              <input type="date" className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#7f8c8d', fontWeight: 500 }}>Fee Type:</label>
              <select className="form-control" value={feeTypeFilter} onChange={(e) => setFeeTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="course">Course Fee</option>
                <option value="certificate">Certificate Fee</option>
                <option value="app">App Fee</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ background: '#0033A0' }}><i className="fas fa-filter"></i> Filter</button>
            <button className="btn btn-secondary" onClick={() => { setDateFilter(new Date().toISOString().split('T')[0]); setFeeTypeFilter(''); }}><i className="fas fa-times"></i> Clear</button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Student</th><th>Amount</th><th>Method</th><th>Fee Type</th><th>Time</th></tr></thead>
            <tbody>
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#bdc3c7' }}>
                <i className="fas fa-receipt" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', color: '#dfe6e9' }}></i>
                <h4 style={{ color: '#7f8c8d', fontWeight: 500, margin: '0 0 4px' }}>No payments recorded today</h4>
                <p style={{ fontSize: '0.85rem', color: '#bdc3c7', margin: 0 }}>Payments will appear here as they are recorded</p>
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

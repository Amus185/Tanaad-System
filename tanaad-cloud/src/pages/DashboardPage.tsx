import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

interface DashboardData {
  total_students: number;
  total_teachers: number;
  total_courses: number;
  today_total_expected: number;
  today_total_paid: number;
  today_total_outstanding: number;
  fee_types: Record<string, number>;
  expected_by_fee: Record<string, number>;
  paid_total_by_fee: Record<string, number>;
  outstanding_by_fee: Record<string, number>;
  student_payments: Array<{
    student: { name: string };
    payment: { amount: number; payment_method: string; fee_type: string; payment_date: string };
  }>;
}

// Mock data until API is connected
const MOCK: DashboardData = {
  total_students: 245, total_teachers: 3, total_courses: 9,
  today_total_expected: 3675, today_total_paid: 1250, today_total_outstanding: 2425,
  fee_types: { course: 15, certificate: 65, app: 10 },
  expected_by_fee: { course: 3675, certificate: 0, app: 0 },
  paid_total_by_fee: { course: 1250, certificate: 0, app: 0 },
  outstanding_by_fee: { course: 2425, certificate: 0, app: 0 },
  student_payments: [],
};

export function DashboardPage() {
  const { user } = useAuth();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [feeTypeFilter, setFeeTypeFilter] = useState('');

  // Use mock data for now
  const data = MOCK;

  const statCards = [
    { title: 'Total Students', value: data.total_students, icon: 'fas fa-users', color: '#00A54F' },
    { title: 'Teachers', value: data.total_teachers, icon: 'fas fa-chalkboard-teacher', color: '#9b59b6' },
    { title: 'Active Courses', value: data.total_courses, icon: 'fas fa-book', color: '#f39c12' },
    { title: "Today's Total Expected", value: `$${data.today_total_expected.toFixed(2)}`, icon: 'fas fa-dollar-sign', color: '#27ae60' },
  ];

  return (
    <>
      {/* Header */}
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
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username || 'Admin'}&background=3498db&color=fff`}
            alt="User" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #00A54F' }}
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-cards">
        {statCards.map((card) => (
          <div className="stat-card" key={card.title}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#95a5a6', fontWeight: 500 }}>{card.title}</span>
              <div className="card-icon" style={{ background: card.color }}>
                <i className={card.icon}></i>
              </div>
            </div>
            <div className="card-value">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Fee Breakdown */}
      <div className="fee-breakdown">
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0033A0', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-receipt" style={{ color: '#00A54F' }}></i> Fee Structure and Status
        </div>
        <div className="fee-breakdown-grid">
          {Object.entries(data.fee_types).map(([ft, amt]) => (
            <div className="fee-item" key={ft}>
              <span className="fee-label">{ft.charAt(0).toUpperCase() + ft.slice(1)} Fee</span>
              <span className="fee-value">Fee: ${amt}</span>
              <span className="fee-value">Expected: ${(data.expected_by_fee[ft] || 0).toFixed(2)}</span>
              <span className="fee-value">Paid: ${(data.paid_total_by_fee[ft] || 0).toFixed(2)}</span>
              <span className="fee-value">Outstanding: ${(data.outstanding_by_fee[ft] || 0).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Payments */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Today's Payments</h3>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a href="/payments" className="btn btn-primary">
              <i className="fas fa-file-export"></i> View All Payments
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-grid">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Date:</label>
              <input type="date" className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Fee Type:</label>
              <select className="form-control" value={feeTypeFilter} onChange={(e) => setFeeTypeFilter(e.target.value)} style={{ minWidth: 150 }}>
                <option value="">All Types</option>
                <option value="course">Course Fee</option>
                <option value="certificate">Certificate Fee</option>
                <option value="app">App Fee</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ background: '#0033A0' }}>
              <i className="fas fa-filter"></i> Filter
            </button>
            <button className="btn btn-secondary" onClick={() => { setDateFilter(new Date().toISOString().split('T')[0]); setFeeTypeFilter(''); }}>
              <i className="fas fa-times"></i> Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Fee Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.student_payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    <i className="fas fa-receipt"></i>
                    <h4>No payments recorded today</h4>
                    <p>Payments will appear here as they are recorded</p>
                  </td>
                </tr>
              ) : (
                data.student_payments.map((sp, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{sp.student.name}</td>
                    <td style={{ fontWeight: 600, color: '#00A54F' }}>${sp.payment.amount.toFixed(2)}</td>
                    <td style={{ textTransform: 'capitalize' }}>{sp.payment.payment_method || 'Cash'}</td>
                    <td><span className="fee-type-badge">{sp.payment.fee_type || 'course'}</span></td>
                    <td style={{ color: '#95a5a6', fontSize: '0.85rem' }}>{sp.payment.payment_date.substring(11, 16)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const COURSES = ['A+','A++','Multimedia','Web Design','Javascript','Networking','Database','Programming','Basic Computer Application'];
const METHODS = ['Cash', 'Bank Transfer', 'Mobile Money'];
const FEE_TYPES = ['course', 'certificate', 'app'];

const MOCK_STUDENTS = [
  { id: 1, name: 'Ahmed Ali', phone: '0612345678' },
  { id: 2, name: 'Fatima Hassan', phone: '0623456789' },
  { id: 3, name: 'Mohamed Abdi', phone: '0634567890' },
];

export function AddPaymentPage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Cash');
  const [feeType, setFeeType] = useState('course');
  const [description, setDescription] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Payment saved (mock)');
    navigate('/payments');
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1.25rem 2rem', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#0033A0', fontWeight: 700, margin: 0 }}>Add New Payment</h1>
          <p style={{ fontSize: '0.85rem', color: '#95a5a6', margin: '4px 0 0' }}>Record a new payment transaction</p>
        </div>
        <Link to="/payments" className="btn btn-secondary"><i className="fas fa-arrow-left"></i> Back</Link>
      </div>

      <div style={{ background: '#fff', borderRadius: 10, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', maxWidth: 700 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Student */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#0033A0', fontSize: '0.85rem' }}>Student *</label>
              <select className="form-control" style={{ width: '100%' }} value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
                <option value="">Select Student</option>
                {MOCK_STUDENTS.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.phone}</option>)}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#0033A0', fontSize: '0.85rem' }}>Amount ($) *</label>
              <input type="number" step="0.01" min="0" className="form-control" style={{ width: '100%' }} value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="0.00" />
            </div>

            {/* Fee Type */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#0033A0', fontSize: '0.85rem' }}>Fee Type *</label>
              <select className="form-control" style={{ width: '100%' }} value={feeType} onChange={(e) => setFeeType(e.target.value)}>
                {FEE_TYPES.map((f) => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)} Fee</option>)}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#0033A0', fontSize: '0.85rem' }}>Payment Method *</label>
              <select className="form-control" style={{ width: '100%' }} value={method} onChange={(e) => setMethod(e.target.value)}>
                {METHODS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>

            {/* Date */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#0033A0', fontSize: '0.85rem' }}>Date</label>
              <input type="date" className="form-control" style={{ width: '100%' }} defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#0033A0', fontSize: '0.85rem' }}>Description</label>
              <textarea className="form-control" style={{ width: '100%', minHeight: 80, resize: 'vertical' }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional notes..."></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <Link to="/payments" className="btn btn-secondary"><i className="fas fa-times"></i> Cancel</Link>
            <button type="submit" className="btn btn-success"><i className="fas fa-save"></i> Save Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

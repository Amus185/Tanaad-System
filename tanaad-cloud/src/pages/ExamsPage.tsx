import { Link } from 'react-router-dom';

const MOCK_EXAMS = [
  { id: 1, student: 'Ahmed Ali', course: 'A+', score: 85, date: '2026-04-15' },
  { id: 2, student: 'Fatima Hassan', course: 'A++', score: 92, date: '2026-04-15' },
  { id: 3, student: 'Mohamed Abdi', course: 'Web Design', score: 78, date: '2026-04-16' },
];

export function ExamsPage() {
  return (
    <>
      <div className="page-header">
        <div><h1>Exam Management</h1><p>View and manage all exam records</p></div>
        <Link to="/exams/add" className="btn btn-primary"><i className="fas fa-plus"></i> Add New Exam</Link>
      </div>
      <div className="content-card">
        <div className="card-header"><h3 className="card-title">Exam Records</h3></div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Student</th><th>Course</th><th>Score</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {MOCK_EXAMS.map((e) => (
                <tr key={e.id}>
                  <td>EXM-{String(e.id).padStart(5, '0')}</td>
                  <td style={{ fontWeight: 600 }}>{e.student}</td>
                  <td><span className="course-pill">{e.course}</span></td>
                  <td style={{ fontWeight: 600, color: e.score >= 80 ? '#27ae60' : e.score >= 60 ? '#f39c12' : '#e74c3c' }}>{e.score}/100</td>
                  <td>{e.date}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/exams/edit/${e.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                      <button className="btn btn-danger" onClick={() => confirm('Delete?')}><i className="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

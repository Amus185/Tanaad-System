import { useState } from 'react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'security'>('general');
  const tabs = [
    { id: 'general' as const, label: 'General', icon: 'fas fa-cog' },
    { id: 'email' as const, label: 'Email', icon: 'fas fa-envelope' },
    { id: 'security' as const, label: 'Security', icon: 'fas fa-shield-alt' },
  ];

  return (
    <>
      <div className="page-header">
        <div><h1>Settings</h1><p>Configure system preferences</p></div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {tabs.map((tab) => (
          <button key={tab.id} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
            style={activeTab === tab.id ? { background: '#0033A0' } : {}}
            onClick={() => setActiveTab(tab.id)}>
            <i className={tab.icon}></i> {tab.label}
          </button>
        ))}
      </div>

      <div className="content-card">
        {activeTab === 'general' && (
          <>
            <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>General Settings</h3>
            <div style={{ display: 'grid', gap: '1rem', maxWidth: 600 }}>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>College Name</label><input className="form-control" style={{ width: '100%' }} defaultValue="Tanaad Computer Science College" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>College Email</label><input className="form-control" style={{ width: '100%' }} defaultValue="info@tanaad.edu" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Phone Number</label><input className="form-control" style={{ width: '100%' }} defaultValue="+252 61 000 0000" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Address</label><input className="form-control" style={{ width: '100%' }} defaultValue="Hargeisa, Somaliland" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Academic Year</label><input className="form-control" style={{ width: '100%' }} defaultValue="2025-2026" /></div>
              <button className="btn btn-success" style={{ width: 'fit-content' }}><i className="fas fa-save"></i> Save Changes</button>
            </div>
          </>
        )}
        {activeTab === 'email' && (
          <>
            <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Email Settings</h3>
            <div style={{ display: 'grid', gap: '1rem', maxWidth: 600 }}>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>SMTP Server</label><input className="form-control" style={{ width: '100%' }} defaultValue="smtp.gmail.com" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>SMTP Port</label><input className="form-control" style={{ width: '100%' }} defaultValue="587" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Username</label><input className="form-control" style={{ width: '100%' }} /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Password</label><input type="password" className="form-control" style={{ width: '100%' }} /></div>
              <button className="btn btn-success" style={{ width: 'fit-content' }}><i className="fas fa-save"></i> Save Changes</button>
            </div>
          </>
        )}
        {activeTab === 'security' && (
          <>
            <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Security Settings</h3>
            <div style={{ display: 'grid', gap: '1rem', maxWidth: 600 }}>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Session Timeout (minutes)</label><input type="number" className="form-control" style={{ width: '100%' }} defaultValue="30" /></div>
              <div><label style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#0033A0' }}>Max Login Attempts</label><input type="number" className="form-control" style={{ width: '100%' }} defaultValue="5" /></div>
              <div><label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: '#00A54F' }} /> Require Strong Passwords</label></div>
              <div><label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" style={{ width: 18, height: 18, accentColor: '#00A54F' }} /> Enable Two-Factor Authentication</label></div>
              <button className="btn btn-success" style={{ width: 'fit-content' }}><i className="fas fa-save"></i> Save Changes</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ username: username.trim(), password, role: 'admin' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', background: 'linear-gradient(135deg, #001a54 0%, #0033A0 50%, #001a54 100%)',
    }}>
      <div style={{
        width: '100%', maxWidth: 400, background: '#fff', borderRadius: 12,
        padding: '2.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="Tanaad College" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0033A0', marginBottom: 4 }}>Tanaad College</h1>
          <p style={{ fontSize: '0.8rem', color: '#95a5a6' }}>Computer Science College — Management Portal</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#e74c3c', fontSize: '0.85rem', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0033A0', marginBottom: 6 }}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus
              placeholder="Enter your username"
              style={{
                width: '100%', padding: '0.7rem 1rem', border: '2px solid #e0e0e0', borderRadius: 8,
                fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#00A54F'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0033A0', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="Enter your password"
              style={{
                width: '100%', padding: '0.7rem 1rem', border: '2px solid #e0e0e0', borderRadius: 8,
                fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#00A54F'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button type="submit" disabled={submitting} style={{
            width: '100%', padding: '0.8rem', border: 'none', borderRadius: 8, color: '#fff',
            fontWeight: 600, fontSize: '0.9rem', cursor: submitting ? 'not-allowed' : 'pointer',
            background: 'linear-gradient(135deg, #00A54F, #00D360)', fontFamily: 'inherit',
            boxShadow: '0 4px 15px rgba(0,165,79,0.3)', transition: 'all 0.2s',
            opacity: submitting ? 0.6 : 1,
          }}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#95a5a6', marginTop: '1.5rem' }}>
          Tanaad Computer Science College &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

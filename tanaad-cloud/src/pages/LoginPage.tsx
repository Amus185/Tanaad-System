import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ username: username.trim(), password, role });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background orbs */}
      <div style={{
        position: 'fixed', top: '10%', left: '15%',
        width: '300px', height: '300px',
        background: 'rgba(99, 102, 241, 0.08)',
        borderRadius: '50%', filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', right: '10%',
        width: '400px', height: '400px',
        background: 'rgba(139, 92, 246, 0.06)',
        borderRadius: '50%', filter: 'blur(120px)',
        pointerEvents: 'none',
      }} />

      {/* Login Card */}
      <div
        className="fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(148, 163, 184, 0.08)',
          borderRadius: '1.25rem',
          padding: '2.5rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="/logo.png"
            alt="Tanaad College Logo"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              display: 'block',
              objectFit: 'cover',
              animation: 'float 4s ease-in-out infinite',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
            }}
          />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
            Tanaad College
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Computer Science College — Management Portal
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            className="fade-in"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              fontSize: '0.85rem',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '1.15rem' }}>
            <label
              htmlFor="username"
              style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="input-field"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.15rem' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="role"
              style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
              style={{ cursor: 'pointer', appearance: 'none' }}
            >
              <option value="admin">Administrator</option>
              <option value="finance">Finance</option>
              <option value="teacher">Teacher</option>
              <option value="registrar">Registrar</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '0.68rem',
          color: '#475569',
          marginTop: '1.75rem',
        }}>
          Tanaad Computer Science College &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

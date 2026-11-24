import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState('login');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');

  // Feedback states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        const userRole = response.data.role || 'USER';
        localStorage.setItem(
          'user',
          JSON.stringify({ email: email.trim(), role: userRole })
        );

        setSuccess(`Login successful! Redirecting as ${userRole}...`);
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      }
    } catch (err) {
      const msg = err.response && err.response.data
        ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data))
        : 'Connection error. Please ensure the backend is running.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password || !fullName) {
      setError('Full Name, Email, and Password are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, {
        fullName: fullName.trim(),
        username: username ? username.trim() : email.split('@')[0],
        email: email.trim(),
        password: password.trim(),
        role: role,
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess(`Account created for ${email}! You can now sign in.`);
        setMode('login');
      }
    } catch (err) {
      const msg = err.response && err.response.data
        ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data))
        : 'Failed to create user. Please check your network.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logoTitle}>🏡 JFSD Platform</h1>

        {/* Tab Switcher */}
        <div style={styles.tabContainer}>
          <button
            style={mode === 'login' ? styles.tabActive : styles.tabInactive}
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
          >
            Sign In
          </button>
          <button
            style={mode === 'register' ? styles.tabActive : styles.tabInactive}
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
          >
            Create New User
          </button>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}
        {success && <div style={styles.successBox}>{success}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="e.g. admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Quick-fill helper credentials */}
            <div style={styles.quickFillSection}>
              <span style={styles.quickFillTitle}>⚡ Quick-Fill Demo Credentials:</span>
              <div style={styles.quickBtnGroup}>
                <button
                  type="button"
                  style={styles.quickBtn}
                  onClick={() => fillCredentials('admin@gmail.com', 'admin123')}
                >
                  🔑 Fill Admin
                </button>
                <button
                  type="button"
                  style={styles.quickBtn}
                  onClick={() => fillCredentials('user@gmail.com', 'user123')}
                >
                  👤 Fill Customer
                </button>
              </div>
            </div>

            <p style={styles.switchPrompt}>
              Don't have an account?{' '}
              <span style={styles.switchLink} onClick={() => { setMode('register'); setError(''); }}>
                Create one here
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={styles.form}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="e.g. johndoe (optional)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Password *</label>
            <input
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.select}
            >
              <option value="USER">Customer (USER)</option>
              <option value="ADMIN">Administrator (ADMIN)</option>
            </select>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p style={styles.switchPrompt}>
              Already have an account?{' '}
              <span style={styles.switchLink} onClick={() => { setMode('login'); setError(''); }}>
                Sign in here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '440px',
    padding: '36px 32px',
    boxSizing: 'border-box',
  },
  logoTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#1e3c72',
    textAlign: 'center',
    margin: '0 0 24px 0',
  },
  tabContainer: {
    display: 'flex',
    background: '#f0f4f8',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '20px',
  },
  tabActive: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    background: '#ffffff',
    color: '#1e3c72',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  },
  tabInactive: {
    flex: 1,
    padding: '10px',
    border: 'none',
    background: 'transparent',
    color: '#666',
    fontWeight: '500',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px',
    marginTop: '12px',
  },
  input: {
    padding: '12px 14px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px 14px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: '#fff',
    outline: 'none',
  },
  submitBtn: {
    marginTop: '22px',
    padding: '13px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
    transition: 'transform 0.15s ease',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    marginBottom: '14px',
    border: '1px solid #fecaca',
  },
  successBox: {
    background: '#dcfce7',
    color: '#166534',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    marginBottom: '14px',
    border: '1px solid #bbf7d0',
  },
  quickFillSection: {
    marginTop: '20px',
    padding: '14px',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px dashed #cbd5e1',
    textAlign: 'center',
  },
  quickFillTitle: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '8px',
  },
  quickBtnGroup: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  quickBtn: {
    flex: 1,
    padding: '8px 12px',
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#1e3c72',
    cursor: 'pointer',
  },
  switchPrompt: {
    textAlign: 'center',
    fontSize: '0.88rem',
    color: '#64748b',
    marginTop: '18px',
  },
  switchLink: {
    color: '#2563eb',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Login;

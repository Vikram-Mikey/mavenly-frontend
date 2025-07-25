import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config.js';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`, {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && !data.error) {
          navigate('/profile');
        } else {
          setCheckingAuth(false);
        }
      })
      .catch(() => setCheckingAuth(false));
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className="auth-loading">Checking authentication…</div>;
  }

  return (
    <section className="page-login">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="username"
          placeholder="Email or Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            role="button"
            tabIndex={0}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword(prev => !prev)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowPassword(prev => !prev)}
            className="toggle-password"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div className="auth-footer">
        <span>Don't have an account? </span>
        <span onClick={() => navigate('/signup')} className="auth-link">Signup</span>
      </div>
    </section>
  );
}

export default Login;

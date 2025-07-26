import React, { useState, useEffect } from 'react';
import './styles/login.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Logout function for use elsewhere in the app
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/logout/`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    // Always redirect to login and clear state
    setForm({ username: '', password: '' });
    setError('');
    navigate('/login');
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setError('');
          navigate('/profile');
        } else {
          setCheckingAuth(false);
        }
      })
      .catch(() => setCheckingAuth(false));
  }, [navigate]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => form.username.trim() && form.password.length >= 8;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      setError('Please enter valid username and password (min 8 chars).');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setError('');
        navigate('/profile');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  if (checkingAuth) return <div className="loading">Checking authentication...</div>;

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>
        <input
          name="username"
          type="text"
          placeholder="Email or Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <div className="password-field">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="toggle"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit">Login</button>
        <button type="button" className="logout-btn" onClick={handleLogout} style={{marginTop: '1rem'}}>
          Logout
        </button>
        {error && <div className="error">{error}</div>}
        <div className="auth-footer">
          <span onClick={() => navigate('/forgot-password')}>Forgot password?</span>
          <span onClick={() => navigate('/signup')}>Signup</span>
        </div>
      </form>
    </section>
  );
}

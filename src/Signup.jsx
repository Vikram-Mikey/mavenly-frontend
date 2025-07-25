import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config.js';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Signup failed');
      }
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-signup">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" placeholder="Fullname" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Set Password"
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
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className="password-field">
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            role="button"
            tabIndex={0}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
            aria-pressed={showConfirm}
            onClick={() => setShowConfirm(prev => !prev)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowConfirm(prev => !prev)}
          >
            {showConfirm ? '🙈' : '👁️'}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up…' : 'Signup'}
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div className="auth-footer">
        <span>Already have an account? </span>
        <span onClick={() => navigate('/login')} className="auth-link">Login</span>
      </div>
    </section>
  );
}

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signup.css';
import API_BASE_URL from './config';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.username.trim()) return 'Enter a valid name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email.';
    if (!/^\d{10}$/.test(form.phone)) return 'Enter a 10‑digit phone number.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) navigate('/login');
      else setError(data.error || 'Signup failed.');
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Signup</h1>
        <input
          name="username"
          placeholder="Fullname"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <div className="password-field">
          <input
            name="password"
            type={form.showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle"
            onClick={() => setForm(prev => ({ ...prev, showPassword: !prev.showPassword }))}
            aria-label={form.showPassword ? 'Hide password' : 'Show password'}
          >
            {form.showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <div className="password-field">
          <input
            name="confirmPassword"
            type={form.showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle"
            onClick={() => setForm(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
            aria-label={form.showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {form.showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit">Signup</button>
        {error && <div className="error">{error}</div>}
        <div className="auth-footer">
          <span onClick={() => navigate('/login')}>Already have an account? Login</span>
        </div>
      </form>
    </section>
  );
}

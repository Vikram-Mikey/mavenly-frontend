import React, { useState } from 'react';
import './SignupPopup.css';
import API_BASE_URL from './config';


const SignupPopup = ({ open, onClose }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);
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
      if (res.ok) {
        setSuccess(true);
        setTimeout(onClose, 1500);
      } else {
        setError(data.error || 'Signup failed.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="signup-popup-overlay">
      <div className="signup-popup-container">
        <button className="signup-popup-close" onClick={onClose}>&times;</button>
        <h2 className="signup-popup-title">Sign Up</h2>
        <p className="signup-popup-desc">Subscribe to get started with Mavenly!</p>
        <form className="signup-popup-form" onSubmit={handleSubmit} noValidate>
          <input
            name="username"
            placeholder="Full Name"
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
          <button type="submit" disabled={loading} className="signup-popup-btn">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <div className="signup-popup-error">{error}</div>}
          {success && <div className="signup-popup-success">Signup successful!</div>}
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;

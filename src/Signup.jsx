import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signup.css';

function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const API_BASE_URL = (await import('./config.js')).default;
    const res = await fetch(`${API_BASE_URL}/api/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: form.username, email: form.email, phone: form.phone, password: form.password })
    });
    if (res.ok) {
      navigate('/login');
    } else {
      const data = await res.json();
      setError(data.error || JSON.stringify(data));
    }
  };

  return (
    <section className="page-signup">
      <div className="signup-container">
        <h2 className="highlight signup-title" >SIGNUP</h2>
        <h1 className="highlight signup-subtitle">Please Enter the Details.</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Fullname" value={form.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Set Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ paddingRight: 40 }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: 18,
                color: '#888',
                zIndex: 2
              }}
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              role="button"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={{ paddingRight: 40 }}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: 18,
                color: '#888',
                zIndex: 2
              }}
              tabIndex={0}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              role="button"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="signup-btn">Signup</button>
        </form>
        {error && <div className="signup-error">{error}</div>}
        <div className="signup-link">
          <span>Already have an account? </span>
          <span className="signup-text" onClick={() => window.location.href='/login'}>Login</span>
        </div>
      </div>
    </section>
  );
}

export default Signup;
import React, { useState, useEffect } from 'react';
import './styles/login.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      // Login API call
      const res = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'Username or email not found.') {
          setError('Username or email not found.');
        } else if (data.error === 'Incorrect password.') {
          setError('Incorrect password.');
        } else {
          setError(data.error || 'Login failed.');
        }
        return;
      }
      // Profile API call to confirm authentication
      const profileRes = await fetch(`${API_BASE_URL}/api/profile/`, { credentials: 'include' });
      if (!profileRes.ok) {
        setError('Login succeeded but authentication failed.');
        return;
      }
      const profileData = await profileRes.json();
      if (profileData && profileData.email) {
        setError('');
        navigate('/profile');
      } else {
        setError('Login succeeded but authentication failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <section className="page-login">
      <form className="login-container auth-form" onSubmit={handleSubmit} noValidate>
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
        {error && <div className="error">{error}</div>}
        <div className="auth-footer">
          <span onClick={() => navigate('/forgot-password')}>Forgot password?</span>
          <span onClick={() => navigate('/signup')}>Signup</span>
        </div>
      </form>
    </section>
  );
}

/*
Explanation of credentials: 'include' usage in fetch requests:

The 'credentials: 'include'' option in the fetch request is used to include cookies in the request, which is essential for maintaining a session on the server. When this option is set, the browser will include any cookies associated with the requested URL in the request. This is particularly important for requests to APIs that require authentication, as the cookies may contain session identifiers or other authentication tokens.

In the context of the Login component, 'credentials: 'include'' is used in the login and logout fetch requests to ensure that the session cookies are sent to the server. This allows the server to recognize the user session and respond appropriately, such as by logging the user out or validating the login request.
*/

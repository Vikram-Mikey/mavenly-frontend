import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config.js';
import './styles/forgotpassword.css';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch(`${API_BASE_URL}/api/forgot-password-otp/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('OTP sent to your email.');
      setStep(2);
    } else {
      setError(data.error || JSON.stringify(data));
    }
  };

  const handleVerifyOtp = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch(`${API_BASE_URL}/api/forgot-password-verify/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, otp, new_password: newPassword })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Password changed successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(data.error || JSON.stringify(data));
    }
  };

  return (
    <section className="page-forgot-password">
      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        {step === 1 && (
          <form className="auth-form" onSubmit={handleSendOtp}>
            <input type="text" placeholder="Username or Email" value={username} onChange={e => setUsername(e.target.value)} required />
            <button type="submit">Send OTP</button>
          </form>
        )}
        {step === 2 && (
          <form className="auth-form" onSubmit={handleVerifyOtp}>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="password-input"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <span
                className="show-hide-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                role="button"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <button type="submit">Change Password</button>
          </form>
        )}
        {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
        {error && (
          <div style={{ color: 'red', marginTop: 10 }}>
            {typeof error === 'string'
              ? error
              : Object.entries(error).map(([field, messages]) => (
                  <div key={field}>
                    <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;

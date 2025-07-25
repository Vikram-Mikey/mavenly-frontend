
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    fetch('http://localhost:8000/api/profile/', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
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
    const res = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: form.username, password: form.password })
    });
    if (res.ok) {
      navigate('/profile');
    } else {
      const data = await res.json();
      setError(data.error || JSON.stringify(data));
    }
  };

  if (checkingAuth) {
    return (
      <div style={{textAlign:'center',marginTop:60,fontWeight:600,fontSize:18}}>Checking authentication...</div>
    );
  }

  return (
    <section className="page-login">
      <div className="login-container">
        <h1 className="highlight">Hi, Welcome back!</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Email or Username" value={form.username} onChange={handleChange} required />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
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
          <div className="remember-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="rememberMe" style={{ marginRight: '0.5rem' }} />
              <label htmlFor="rememberMe" style={{ color: '#fff', fontSize: '1rem', cursor: 'pointer' }}>Remember</label>
            </div>
            <span className="forgot-password" style={{ color: '#ff5757', fontSize: '1rem', cursor: 'pointer', marginLeft: '1.5rem' }} onClick={() => navigate('/forgot-password')}>Forgot password?</span>
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <div style={{color:'red'}}>{error}</div>}
        <div className="signup-link">
          <span>Don't have an account? </span>
          <span className="signup-text" style={{color: '#ff5757', cursor: 'pointer'}} onClick={() => window.location.href='/signup'}>Signup</span>
        </div>
      </div>
    </section>
  );
}

export default Login;
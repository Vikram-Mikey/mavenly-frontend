import React from 'react';
import '../styles/notfound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="notfound-section">
      <div className="notfound-content">
        <span className="notfound-icon" role="img" aria-label="Not Found">🚫</span>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button className="notfound-btn" onClick={() => navigate('/')}>Return to Home</button>
      </div>
    </section>
  );
}

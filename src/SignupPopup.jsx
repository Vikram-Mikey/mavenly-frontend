import React, { useState } from 'react';
import Signup from './Signup';
import './styles/signup-popup.css';

export default function SignupPopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="signup-popup-overlay" onClick={onClose}>
      <div className="signup-popup-modal" onClick={e => e.stopPropagation()}>
        <button className="signup-popup-close" onClick={onClose}>&times;</button>
        <Signup />
      </div>
    </div>
  );
}

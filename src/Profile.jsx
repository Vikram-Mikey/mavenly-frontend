import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config';
import './styles/profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editField, setEditField] = useState('');
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.error) setMessage(data.error), setMessageType('error');
        else {
          setProfile(data);
          setForm({ username: data.username, email: data.email, phone: data.phone, password: '' });
          setPhotoUrl(data.photo_url || '');
        }
      })
      .catch(() => {
        setMessage('Failed to load profile.');
        setMessageType('error');
      });
  }, []);

  const needsVerification = field => ['email', 'phone', 'username'].includes(field);

  const handleVerifyRequest = async () => {
    setMessage('Sending verification code...');
    setMessageType('');
    setVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/send-verification-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (res.ok) setMessage('Verification code sent!'), setMessageType('success');
      else setMessage(data.error || 'Failed to send code'), setMessageType('error'), setVerifying(false);
    } catch {
      setMessage('Network error'), setMessageType('error'), setVerifying(false);
    }
  };

  const handleSave = async () => {
    setMessage('Saving...');
    setMessageType('');
    const payload = { field: editField, value: form[editField] };
    if (needsVerification(editField)) payload.verification_code = verificationCode;
    if (editField === 'password') payload.password = form.password;

    try {
      const res = await fetch(`${API_BASE_URL}/api/update-profile/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Updated successfully');
        setMessageType('success');
        setProfile(prev => ({ ...prev, [editField]: form[editField] }));
        setEditField(''); setVerifying(false); setVerificationCode('');
      } else setMessage(data.error || 'Update failed'), setMessageType('error');
    } catch {
      setMessage('Network error'), setMessageType('error');
    }
  };

  // Logout function: removes session from database and redirects to login
  const handleLogout = async () => {
    setMessage('Logging out...');
    setMessageType('');
    try {
      const res = await fetch(`${API_BASE_URL}/logout/`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setMessage('Logged out successfully.');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 500);
      } else {
        const data = await res.json();
        setMessage(data.error || 'Logout failed.');
        setMessageType('error');
      }
    } catch {
      setMessage('Network error.');
      setMessageType('error');
    }
  };

  const renderField = (label, field) => (
    <div className="field-group">
      <label>{label}</label>
      <div className="field-row">
        {editField === field ? (
          <>
            <input name={field} value={form[field]} onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))} />
            {needsVerification(field) && !verifying && (
              <button onClick={handleVerifyRequest} className="verify-btn">Verify</button>
            )}
          </>
        ) : (
          <>
            <span>{profile[field]}</span>
            <button onClick={() => setEditField(field)} className="change-btn">Change</button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="photo-section">
          <img
            src={photoUrl}
            alt="Profile"
            onError={() => setPhotoUrl('')}
            className="avatar"
          />
          <input otion type="file" accept="image/*" onChange={e => {
            if (e.target.files[0]) {
              setPhoto(e.target.files[0]);
              setPhotoUrl(URL.createObjectURL(e.target.files[0]));
            }
          }} />
          {photo && (
            <button onClick={async () => {
              const fd = new FormData();
              fd.append('photo', photo);
              try {
                const res = await fetch(`${API_BASE_URL}/api/upload-profile-photo/`, {
                  method: 'POST',
                  credentials: 'include',
                  body: fd,
                });
                const data = await res.json();
                if (res.ok) {
                  setPhotoUrl(data.photo_url.startsWith('/') ? API_BASE_URL + data.photo_url : data.photo_url);
                  setMessage('Photo updated!');
                  setMessageType('success');
                  setPhoto(null);
                } else {
                  setMessage(data.error || 'Upload failed');
                  setMessageType('error');
                }
              } catch {
                setMessage('Network error');
                setMessageType('error');
              }
            }}>Save Photo</button>
          )}
          {photoUrl && (
            <button onClick={async () => {
              setPhotoUrl(''); setPhoto(null);
              setMessage('Removing photo...');
              try {
                const res = await fetch(`${API_BASE_URL}/api/remove-profile-photo/`, {
                  method: 'POST',
                  credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) setMessage('Photo removed!'), setMessageType('success');
                else setMessage(data.error || 'Removal failed'), setMessageType('error');
              } catch {
                setMessage('Network error');
                setMessageType('error');
              }
            }}>Remove Photo</button>
          )}
        </div>

        {!profile ? (
          <div>Loading...</div>
        ) : (
          <>
            {renderField('Username', 'username')}
            {renderField('Email', 'email')}
            {renderField('Phone', 'phone')}
            {renderField('Password', 'password')}
            {verifying && (
              <div className="verification-row">
                <input
                  placeholder="Verification code"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                />
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button onClick={() => { setEditField(''); setVerifying(false); setVerificationCode(''); }}>Cancel</button>
              </div>
            )}
          </>
        )}

        {message && <div className={`message ${messageType}`}>{message}</div>}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
}

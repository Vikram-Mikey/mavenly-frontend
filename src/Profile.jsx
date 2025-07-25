import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config.js';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editField, setEditField] = useState('');
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const photoMenuRef = useRef(null);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setProfile(data))
      .catch(() => setError('Failed to fetch profile'));
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({ username: profile.username, email: profile.email, phone: profile.phone, password: '' });
      setPhotoUrl(profile.photo_url || '');
    }
  }, [profile]);

  const logout = () => {
    fetch(`${API_BASE_URL}/api/logout/`, { method: 'POST', credentials: 'include' })
      .finally(() => navigate('/'));
  };

  const handleEdit = field => {
    setEditField(field);
    setMessage('');
    setVerifying(false);
    setVerificationCode('');
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const requestVerification = async () => {
    setMessage('Sending verification code…');
    setVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/send-verification-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setMessage('Verification code sent');
    } catch (e) {
      setMessage(e.message);
      setVerifying(false);
    }
  };

  const saveField = async () => {
    setMessage('Saving…');
    try {
      const payload = {
        field: editField,
        value: form[editField],
        verification_code: verificationCode,
        ...(editField === 'password' ? { password: form.password } : {})
      };
      const res = await fetch(`${API_BASE_URL}/api/update-profile/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setMessage('Updated successfully');
      setEditField('');
      setVerifying(false);
      setVerificationCode('');
      setProfile(prev => ({ ...prev, [editField]: form[editField] }));
    } catch (e) {
      setMessage(e.message);
    }
  };

  const handlePhotoChange = e => e.target.files?.[0] && setPhoto(e.target.files[0]);
  const uploadPhoto = async () => {
    if (!photo) return;
    setLoadingPhoto(true);
    const fd = new FormData();
    fd.append('photo', photo);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload-profile-photo/`, {
        method: 'POST',
        credentials: 'include',
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload');
      const url = data.photo_url.startsWith('/') ? API_BASE_URL + data.photo_url : data.photo_url;
      setPhotoUrl(url);
      setMessage('Profile photo updated');
      setPhoto(null);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoadingPhoto(false);
    }
  };
  const removePhoto = async () => {
    setMessage('Removing...');
    try {
      const res = await fetch(`${API_BASE_URL}/api/remove-profile-photo/`, {
        method: 'POST', credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setPhotoUrl('');
      setMessage('Photo removed');
    } catch (e) {
      setMessage(e.message);
    }
  };

  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div className="profile-loading">Loading profile…</div>;

  return (
    <div className="profile-container">
      <div className="profile-photo">
        {photoUrl ? <img src={photoUrl} alt="Profile" /> : <div className="profile-placeholder">👤</div>}
        <div className="photo-actions">
          <button onClick={() => document.getElementById('photoInput').click()}>Update</button>
          {photoUrl && <button onClick={removePhoto}>Remove</button>}
        </div>
        <input id="photoInput" type="file" accept="image/*" hidden onChange={handlePhotoChange} />
        {photo && <button onClick={uploadPhoto} disabled={loadingPhoto}>{loadingPhoto ? 'Uploading...' : 'Save Photo'}</button>}
      </div>
      {['username','email','phone','password'].map(field => (
        <div key={field} className="profile-field">
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          {editField === field ? (
            <>
              <input name={field} type={field === 'password' ? 'password' : 'text'} value={form[field]} onChange={handleChange} />
              {!verifying && <button onClick={requestVerification}>Verify by Email</button>}
            </>
          ) : (
            <>
              <span>{field === 'password' ? '********' : profile[field]}</span>
              <button onClick={() => handleEdit(field)}>Change</button>
            </>
          )}
        </div>
      ))}
      {verifying && (
        <div className="profile-verify">
          <input placeholder="Verification code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
          <button onClick={saveField}>Save</button>
        </div>
      )}
      {message && <div className={`profile-message ${message.toLowerCase().includes('success') ? 'success' : 'error'}`}>{message}</div>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;

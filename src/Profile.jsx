import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config.js';
import Cookies from 'js-cookie';
import './styles/profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('user_id', { path: '/' });
    Cookies.remove('user_email', { path: '/' });
    navigate('/');
  };
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [editField, setEditField] = useState('');
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const photoMenuRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProfile(data);
          setForm({ username: data.username, email: data.email, phone: data.phone, password: '' });
          setPhotoUrl(data.photo_url || '');
        }
      })
      .catch(() => setError('Failed to fetch profile'));
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
    setMessage('');
    setVerifying(false);
    setVerificationCode('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerifyRequest = async () => {
    setMessage('Sending verification code...');
    setVerifying(true);
    let data;
    let res;
    try {
      res = await fetch(`${API_BASE_URL}/api/send-verification-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email })
      });
      data = await res.json();
    } catch (e) {
      setMessage('Network or server error.');
      setVerifying(false);
      return;
    }
    if (res.ok) {
      setMessage('Verification code sent to your email.');
    } else {
      setMessage((data && data.error) || 'Failed to send verification code.');
      setVerifying(false);
    }
  };

  const handleSave = async () => {
    setMessage('Saving...');
    const payload = {
      field: editField,
      value: form[editField],
      verification_code: verificationCode
    };
    if (editField === 'password') {
      payload.password = form.password;
    }
    let data;
    let res;
    try {
      res = await fetch(`${API_BASE_URL}/api/update-profile/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      data = await res.json();
    } catch (e) {
      setMessage('Network or server error.');
      return;
    }
    if (res.ok) {
      setMessage('Updated successfully!');
      setEditField('');
      setVerifying(false);
      setVerificationCode('');
      setProfile({ ...profile, [editField]: form[editField] });
      setForm({ ...form, password: '' });
    } else {
      setMessage((data && data.error) || 'Failed to update.');
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePhotoUpload = async () => {
    if (!photo) return;
    const formData = new FormData();
    formData.append('photo', photo);
    const res = await fetch(`${API_BASE_URL}/api/upload-profile-photo/`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    const data = await res.json();
    if (res.ok && data.photo_url) {
      let url = data.photo_url;
      if (url && url.startsWith('/')) {
        url = API_BASE_URL + url;
      }
      setPhotoUrl(url);
      setMessage('Profile photo updated!');
      setPhoto(null); // Hide Save Photo button immediately
      // Wait for the new photo to load, then show menu
      setTimeout(() => setShowPhotoMenu(true), 200);
    } else {
      setMessage(data.error || 'Failed to upload photo.');
    }
  };


  // Open menu on photo click
  const handlePhotoClick = (e) => {
    e.stopPropagation();
    setShowPhotoMenu((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!showPhotoMenu) return;
    const handleClickOutside = (event) => {
      if (photoMenuRef.current && !photoMenuRef.current.contains(event.target)) {
        setShowPhotoMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPhotoMenu]);

  const handleRemovePhoto = async () => {
    setPhotoUrl('');
    setPhoto(null);
    setShowPhotoMenu(false);
    setMessage('Removing photo...');
    try {
      const res = await fetch(`${API_BASE_URL}/api/remove-profile-photo/`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile photo removed!');
      } else {
        setMessage(data.error || 'Failed to remove photo.');
      }
    } catch (e) {
      setMessage('Failed to remove photo.');
    }
  };


if (error) return <div style={{color:'#d32f2f',textAlign:'center',marginTop:40,fontWeight:600}}>{error}</div>;

  return (
    <div className="profile-main-container">
      <div className="profile-photo-container">
        <div className="profile-photo-avatar" style={{position:'relative', display:'inline-block'}}>
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="profile-photo-img" />
          ) : (
            <span className="profile-photo-icon" role="img" aria-label="profile">👤</span>
          )}
        </div>
        <div className="profile-photo-actions" style={{display:'flex', justifyContent:'center', gap:'18px', marginTop:'10px'}}>
          <span
            className="profile-photo-edit-icon"
            title="Update Photo"
            onClick={() => document.getElementById('profile-photo-upload').click()}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-8.5 8.5a1 1 0 0 1-.293.207l-3 1.5a1 1 0 0 1-1.316-1.316l1.5-3a1 1 0 0 1 .207-.293l8.5-8.5z" stroke="#4998da" strokeWidth="1.5"/>
            </svg>
          </span>
          <input
            id="profile-photo-upload"
            type="file"
            accept="image/*"
            style={{display:'none'}}
            onChange={handlePhotoChange}
            onClick={e=>e.stopPropagation()}
          />
          {photoUrl && (
            <span
              className="profile-photo-delete-icon"
              title="Remove Photo"
              onClick={handleRemovePhoto}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l8 8M6 14L14 6" stroke="#d32f2f" strokeWidth="1.5"/>
              </svg>
            </span>
          )}
        </div>
        <div className="profile-photo-label">Profile Photo</div>
        {photo && (
          <button
            onClick={handlePhotoUpload}
            className="profile-save-photo-btn"
          >
            Save Photo
          </button>
        )}
      </div>
      {!profile ? (
        <div className="profile-loading">
          <div className="profile-loading-spinner" />
          Loading profile...
        </div>
      ) : (
        <>
          <div className="profile-field-group">
            <label className="profile-field-label">Username</label>
            <div className="profile-field-row">
              {editField==='username' ? (
                <>
                  <input name="username" value={form.username} onChange={handleChange} className="profile-input" />
                  {!verifying ? <button onClick={handleVerifyRequest} className="profile-verify-btn">Verify by Email</button> : null}
                </>
              ) : (
                <>
                  <span className="profile-field-value">{profile.username}</span>
                  <>
                    <button
                      onClick={()=>handleEdit('username')}
                      className="profile-change-btn"
                    >
                      Change
                    </button>
                  </>
                </>
              )}
            </div>
          </div>
          <div className="profile-field-group">
            <label className="profile-field-label">Email</label>
            <div className="profile-field-row">
              {editField==='email' ? (
                <>
                  <input name="email" value={form.email} onChange={handleChange} className="profile-input" />
                  {!verifying ? <button onClick={handleVerifyRequest} className="profile-verify-btn">Verify by Email</button> : null}
                </>
              ) : (
                <>
                  <span className="profile-field-value">{profile.email}</span>
                  <>
                    <button
                      onClick={()=>handleEdit('email')}
                      className="profile-change-btn"
                    >
                      Change
                    </button>
                  </>
                </>
              )}
            </div>
          </div>
          <div className="profile-field-group">
            <label className="profile-field-label">Phone</label>
            <div className="profile-field-row">
              {editField==='phone' ? (
                <>
                  <input name="phone" value={form.phone} onChange={handleChange} className="profile-input" />
                  {!verifying ? <button onClick={handleVerifyRequest} className="profile-verify-btn">Verify by Email</button> : null}
                </>
              ) : (
                <>
                  <span className="profile-field-value">{profile.phone}</span>
                  <>
                    <button
                      onClick={()=>handleEdit('phone')}
                      className="profile-change-btn"
                    >
                      Change
                    </button>
                  </>
                </>
              )}
            </div>
          </div>
          <div className="profile-field-group">
            <label className="profile-field-label">Password</label>
            <div className="profile-field-row">
              {editField==='password' ? (
                <>
                  <input name="password" type="password" value={form.password} onChange={handleChange} className="profile-input" />
                  {!verifying ? <button onClick={handleVerifyRequest} className="profile-verify-btn">Verify by Email</button> : null}
                </>
              ) : (
                <>
                  <span className="profile-field-value">********</span>
                  <>
                    <button
                      onClick={()=>handleEdit('password')}
                      className="profile-change-btn"
                    >
                      Change
                    </button>
                  </>
                </>
              )}
            </div>
          </div>
          {verifying && (
            <div className="profile-verifying-row">
              <input placeholder="Enter verification code" value={verificationCode} onChange={e=>setVerificationCode(e.target.value)} className="profile-input" />
              <button onClick={handleSave} className="profile-save-btn">Save</button>
            </div>
          )}
        </>
      )}
      {message && <div className={"profile-message " + (message.includes('success') ? 'success' : 'error')}>{message}</div>}
      <button
        onClick={handleLogout}
        className="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

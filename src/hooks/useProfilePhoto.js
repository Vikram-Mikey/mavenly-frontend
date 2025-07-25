import { useEffect, useState } from 'react';

export default function useProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if user is logged in
    const hasUserId = document.cookie.split(';').some(c => c.trim().startsWith('user_id='));
    if (!hasUserId) {
      setPhotoUrl('');
      setLoading(false);
      return;
    }
    fetch('http://localhost:8000/api/profile/', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          console.error('Profile fetch failed:', res.status, res.statusText);
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        let url = data.photo_url || '';
        if (url && url.startsWith('/')) url = 'http://localhost:8000' + url;
        setPhotoUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile photo:', err);
        setPhotoUrl('');
        setLoading(false);
      });
  }, []);

  return { photoUrl, loading };
}

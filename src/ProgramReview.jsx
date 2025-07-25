

import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
// import API_BASE_URL from './config';
import './styles/programreview.css';


const StarRating = ({ rating, setRating }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={star <= rating ? 'star filled' : 'star'}
        onClick={() => setRating(star)}
        role="button"
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        style={{fontSize:'22px',cursor:'pointer',color:star <= rating ? '#fbbf24' : '#d1d5db',marginRight:2}}
      >
        ★
      </span>
    ))}
  </div>
);
  


// Get host/admin email from config or environment
import API_BASE_URL from './config';
const ADMIN_EMAIL = (typeof window !== 'undefined' && window.HOST_EMAIL) ? window.HOST_EMAIL : 'r.vikram.s321@gmail.com';

// Helper to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}
const ProgramReview = ({ programName }) => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', review: '', rating: 1 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get admin email from cookie (set on login)
  const [adminEmail, setAdminEmail] = useState("");
  useEffect(() => {
    let email = getCookie("user_email");
    if (email && email.startsWith('"') && email.endsWith('"')) {
      email = email.slice(1, -1);
    }
    setAdminEmail(email || "");
  }, []);

  useEffect(() => {
    fetchReviews();
    
  }, [programName]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/program-reviews/?program=${programName}`);
      // Ensure reviews is always an array
      if (Array.isArray(res.data)) {
        setReviews(res.data);
      } else if (res.data && Array.isArray(res.data.results)) {
        setReviews(res.data.results);
      } else {
        setReviews([]);
      }
    } catch (err) {
      setReviews([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (star) => {
    setForm({ ...form, rating: star });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);
    if (!form.name || !form.review || !form.rating || form.rating < 1 || form.rating > 5) {
      setError('Please fill all fields and select a valid rating (1-5).');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/program-reviews/`, {
        program: programName,
        name: form.name,
        review: form.review,
        rating: form.rating.toString(),
      });
      setSubmitted(true);
      setForm({ name: '', review: '', rating: 1 });
      fetchReviews();
    } catch (err) {
      setError('Failed to submit review.');
    }
  };

  // Responsive pagination logic: 4 reviews per page on desktop, 3 on mobile
  const [page, setPage] = useState(1);
  const getReviewsPerPage = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 700) {
      return 3;
    }
    return 4;
  };
  const [reviewsPerPage, setReviewsPerPage] = useState(getReviewsPerPage());
  useEffect(() => {
    const handleResize = () => setReviewsPerPage(getReviewsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

  // State to track which reviews are expanded (by review id or index)
  const [expandedReviews, setExpandedReviews] = useState({});

  // Helper to toggle expanded state for a review
  const toggleExpanded = (reviewId) => {
    setExpandedReviews(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  // Child component for each review item
  function ReviewItem({ r, idx, expanded, onToggle, onDelete, adminEmail, ADMIN_EMAIL, fading }) {
    const textRef = useRef(null);
    const [showReadMore, setShowReadMore] = useState(false);
    useEffect(() => {
      // Wait for DOM paint to ensure correct measurement
      if (!expanded && textRef.current) {
        const el = textRef.current;
        // Use setTimeout to defer until after paint
        const timer = setTimeout(() => {
          setShowReadMore(el.scrollHeight > el.clientHeight + 2);
        }, 0);
        return () => clearTimeout(timer);
      } else {
        setShowReadMore(false);
      }
    }, [expanded, r.review]);
    return (
      <li key={r.id || idx} className={fading ? 'fade-out' : ''} style={{background:'#fff',borderRadius:10,boxShadow:'0 2px 12px #0001',marginBottom:18,padding:'18px 18px 12px 18px',position:'relative',transition:'box-shadow 0.2s'}}>
        <div className="review-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span className="review-name" style={{fontWeight:700,fontSize:16,color:'#2563eb'}}>{r.name}</span>
            <span className="review-stars" style={{fontSize:15,color:'#fbbf24',fontWeight:600}}>{'★'.repeat(Number(r.rating))}{'☆'.repeat(5 - Number(r.rating))}</span>
          </div>
          {adminEmail && adminEmail.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() && (
            <button
              type="button"
              style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:5,padding:'4px 10px',fontWeight:700,cursor:'pointer',fontSize:14,marginLeft:8}}
              onClick={onDelete}
              title="Delete Review"
            >
              Delete
            </button>
          )}
        </div>
        <div
          ref={textRef}
          className={`review-text${!expanded ? ' clamped' : ''}`}
          style={{fontSize:15,color:'#374151',marginBottom:(showReadMore || expanded) ? 0 : 6,whiteSpace:'pre-line',lineHeight:1.7}}
        >
          {r.review}
        </div>
        {(showReadMore || expanded) && (
          <span
            style={{color:'#2563eb',fontWeight:600,cursor:'pointer',marginLeft:2,fontSize:14,display:'inline-block',marginBottom:6}}
            onClick={onToggle}
          >
            {expanded ? 'Show less' : 'Read more'}
          </span>
        )}
        <div className="review-date" style={{fontSize:13,color:'#64748b',fontWeight:500}}>
          {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
        </div>
      </li>
    );
  }

  return (
    <section className="programdev-review-section programdev-review-bg">
      <h2>Student Reviews</h2>
      <form className="programdev-review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="review"
          placeholder="Share your experience..."
          value={form.review}
          onChange={handleChange}
          required
          rows={4}
        />
        <div className="star-row">
          <span style={{fontWeight:600,color:'#374151',fontSize:16}}>Your Rating:</span>
          <StarRating rating={form.rating} setRating={handleRating} />
        </div>
        <button type="submit" disabled={form.rating < 1 || form.rating > 5}>Submit Review</button>
        {error && <div className="error">{error}</div>}
        {submitted && <div className="success">Thank you for your review!</div>}
      </form>
      <div className="programdev-review-list">
        {loading ? (
          <div style={{color:'#374151',textAlign:'center',fontWeight:700,fontSize:18}}>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div style={{color:'#374151',textAlign:'center',fontWeight:700,fontSize:18}}>No reviews yet for this program.</div>
        ) : (
          <>
            <ul>
              {paginatedReviews.map((r, idx) => {
                const reviewKey = r.id || idx;
                const expanded = !!expandedReviews[reviewKey];
                return (
                  <ReviewItem
                    key={reviewKey}
                    r={r}
                    idx={idx}
                    expanded={expanded}
                    fading={r._fading}
                    adminEmail={adminEmail}
                    ADMIN_EMAIL={ADMIN_EMAIL}
                    onToggle={() => toggleExpanded(reviewKey)}
                    onDelete={async (e) => {
                      e.preventDefault();
                      setReviews(prev => prev.map((item, i) => i === (page - 1) * reviewsPerPage + idx ? { ...item, _fading: true } : item));
                      setTimeout(async () => {
                        try {
                          await axios.delete(`${API_BASE_URL}/api/program-reviews/${r.id}/`, {
                            headers: { 'X-User-Email': adminEmail }
                          });
                          fetchReviews();
                        } catch (err) {
                          fetchReviews();
                        }
                      }, 350);
                    }}
                  />
                );
              })}
            </ul>
            {totalPages > 1 && (
              <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:18}}>
                {(() => {
                  let start = 1;
                  let end = Math.min(totalPages, 5);
                  if (page > 3 && totalPages > 5) {
                    start = page - 2;
                    end = page + 2;
                    if (end > totalPages) {
                      end = totalPages;
                      start = Math.max(1, end - 4);
                    }
                  }
                  const buttons = [];
                  for (let i = start; i <= end; i++) {
                    buttons.push(
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={page === i ? 'active-page' : ''}
                        style={{
                          minWidth:32,
                          height:32,
                          borderRadius:6,
                          border:'1.5px solid #bfcbe6',
                          background: page === i ? '#2563eb' : '#fff',
                          color: page === i ? '#fff' : '#2563eb',
                          fontWeight:700,
                          fontSize:16,
                          cursor:'pointer',
                          transition:'all 0.2s',
                        }}
                      >
                        {i}
                      </button>
                    );
                  }
                  if (end < totalPages) {
                    buttons.push(
                      <span key="ellipsis" style={{alignSelf:'center',fontWeight:700,fontSize:18,margin:'0 4px'}}>...</span>
                    );
                    buttons.push(
                      <button
                        key={totalPages}
                        onClick={() => setPage(totalPages)}
                        className={page === totalPages ? 'active-page' : ''}
                        style={{
                          minWidth:32,
                          height:32,
                          borderRadius:6,
                          border:'1.5px solid #bfcbe6',
                          background: page === totalPages ? '#2563eb' : '#fff',
                          color: page === totalPages ? '#fff' : '#2563eb',
                          fontWeight:700,
                          fontSize:16,
                          cursor:'pointer',
                          transition:'all 0.2s',
                        }}
                      >
                        {totalPages}
                      </button>
                    );
                  }
                  return buttons;
                })()}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProgramReview;

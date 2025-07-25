import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API_BASE_URL from './config.js';
import './styles/freelancingprogramdevsection.css';


function FreelancingProgramDevSection({ className, imgSrc, imgAlt }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    officeMotive: '',
    preference: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/freelancing-enquiry-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company || '', // always send company, even if empty
          officeMotive: form.officeMotive,
          preference: form.preference,
          program: imgAlt || '', // send program name from frontend
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send enquiry.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };
  return (
    <section className={`freelancing-section ${className || ''}`}>
      <div className="freelancing-dev">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="freelancing-img"
        />
        {!submitted && (
          <form className="freelancing-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
            <input type="text" name="officeMotive" placeholder="Office Motive" value={form.officeMotive} onChange={handleChange} required />
            <input type="text" name="preference" placeholder="Preference" value={form.preference} onChange={handleChange} required />
            <button type="submit">Enquiry</button>
          </form>
        )}
        {submitted && (
          <div className="freelancing-enquiry-success">
            <h3>Thank you!</h3>
            <p>Your enquiry has been sent. We will get back to you soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}


export default FreelancingProgramDevSection;
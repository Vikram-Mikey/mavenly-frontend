import './styles/contact.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const API_BASE_URL = (await import('./config.js')).default;
      const res = await fetch(`${API_BASE_URL}/api/contact-enquiry-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error ? `Failed to send enquiry: ${data.error}` : 'Failed to send enquiry.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };
  return (
    <>
      <section className="contact-hero-section">
        <div className="contact-hero-section-inner">
          <h2 className="contact-hero-section-title">Contact</h2>
          <p className="contact-hero-section-desc">
            Start the conversation to established good relationship and business.
          </p>
        </div>
      </section>
      <section className="contact-details-section">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>Get in touch and let us know how we can help.<br />Whether it’s about courses, enrollment, or support, feel free to reach out—we’re here to help!</p>
          <div className="office">
            <span>Office</span><br />
            Come Say hello at our office:<br />
            451, Kamarajar Road, Peelamedu, Lakshmi Ammal Layout, Hopes College, Coimbatore- 641014, Tamil Nadu
          </div>
          <div className="email">
            <span>Email us</span><br />
            hr@mavenly.in
          </div>
          <div className="talk">
            <span>Let's Talk</span><br />
             +91 63808 06142
          </div>
        </div>
        <div className="contact-form">
          <h2>Send us a message</h2>
          <p>Have a question or need assistance? Fill out the form below, and our team will get back to you soon!</p>
          {!submitted && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
              <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
              <button type="submit">Send Message</button>
            </form>
          )}
          {submitted && (
            <div className="contact-enquiry-success">
              <h2>Thank you!</h2>
              <p>Your enquiry has been sent. We will get back to you soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Contact;

import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config.js';
import ProgramReview from './ProgramReview';
import { useNavigate } from 'react-router-dom';
import './styles/programdevsection.css';

// Syllabus imports
import fullStackDevelopment from './syllabus/fullStackDevelopment';
import dataAnalytics from './syllabus/dataAnalytics';
import cybersecurity from './syllabus/cybersecurity';
import digitalMarketing from './syllabus/digitalMarketing';
import financeProgram from './syllabus/financeProgram';
import uiUxDesigning from './syllabus/uiUxDesigning';
import ai from './syllabus/ai';
import cloudComputing from './syllabus/cloudComputing';
import appDevelopment from './syllabus/appDevelopment';
import embeddedSystem from './syllabus/embeddedSystem';
import autoCad from './syllabus/autoCad';
import humanResourceManagement from './syllabus/humanResourceManagement';
import medicalCoding from './syllabus/medicalCoding';
import psychology from './syllabus/psychology';
import python from './syllabus/python';
import java from './syllabus/java';
import c from './syllabus/c';
import cpp from './syllabus/cpp';
import powerbi from './syllabus/powerbi';
import excel from './syllabus/excel';
import WEBINAR_VIDEOS from './webinarVideos';
import WebinarPlayer from './WebinarPlayer';

const PROGRAMS = [
  { name: 'Full Stack Development', img: '/Full Stack Development.jpg' },
  { name: 'Data Analytics', img: '/Data Analytics.jpg' },
  { name: 'Cybersecurity', img: '/Digital Marketing.jpg' },
  { name: 'Digital Marketing', img: '/Finance Program.jpg' },
  { name: 'Finance Program', img: '/UI Designing.jpg' },
  { name: 'UI/UX Designing', img: '/ai.jpg' },
  { name: 'AI', img: '/cloud computing.jpeg' },
  { name: 'Cloud Computing', img: '/app development.webp' },
  { name: 'App Development', img: '/embedded system.jpeg' },
  { name: 'Embedded System', img: '/AutoCAD.webp' },
  { name: 'Auto Cad', img: '/mhr.webp' },
  { name: 'Human Resource Management', img: '/medical coding.jpeg' },
  { name: 'Medical Coding', img: '/psychology.jpeg' },
  { name: 'Psychology', img: '/python.png' },
  { name: 'Python', img: '/java.png' },
  { name: 'Java', img: '/c.png' },
  { name: 'C', img: '/cpp.png' },
  { name: 'Cpp', img: '/powerbi.png' },
  { name: 'PowerBI', img: '/excel.png' },
  { name: 'Excel', img: '/Full Stack Development.jpg' }
];



// Syllabus mapping (normalized keys)
const SYLLABUS_MAP = {
  'full stack development': fullStackDevelopment,
  'data analytics': dataAnalytics,
  'cybersecurity': cybersecurity,
  'digital marketing': digitalMarketing,
  'finance program': financeProgram,
  'ui ux designing': uiUxDesigning,
  'ai': ai,
  'cloud computing': cloudComputing,
  'app development': appDevelopment,
  'embedded system': embeddedSystem,
  'auto cad': autoCad,
  'human resource management': humanResourceManagement,
  'medical coding': medicalCoding,
  'psychology': psychology,
  'python': python,
  'java': java,
  'c': c,
  'cpp': cpp,
  'powerbi': powerbi,
  'excel': excel,
};


function ProgramDevSection({ className, imgSrc, imgAlt }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [cartMessages, setCartMessages] = useState({ basic: '', pro: '', premium: '' });
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [expandedSyllabus, setExpandedSyllabus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const [sessionId, setSessionId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`, {
      method: 'GET',
      credentials: 'include', // Ensures cookies are sent
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.email) {
          setIsLoggedIn(true);
          setSessionId(data.id || data.email);
        } else {
          setIsLoggedIn(false);
          setSessionId(null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setSessionId(null);
        setIsLoading(false);
      });
  }, []);
  const handleAddCart = (planKey, planName) => {
    if (isLoading) return; // Wait for session check
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // ...existing code...
    const programName = imgAlt;
    const programObj = PROGRAMS.find(p => p.name === programName);
    if (!programObj) {
      setCartMessages(msgs => ({ ...msgs, [planKey]: 'Program not found! Check the PROGRAMS array and imgAlt value.' }));
      return;
    }
    const cart = JSON.parse(localStorage.getItem(`cart_${sessionId}`) || '[]');
    if (cart.some(item => item.program === programObj.name && item.plan === planName)) {
      setCartMessages(msgs => ({ ...msgs, [planKey]: 'The cart is already added' }));
      return;
    }
    cart.push({ program: programObj.name, plan: planName, img: programObj.img });
    localStorage.setItem(`cart_${sessionId}`, JSON.stringify(cart));
    setCartMessages(msgs => ({ ...msgs, [planKey]: 'Added to cart!' }));
    navigate('/addcart');
  };

  const handleEnquiryChange = e => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async e => {
    e.preventDefault();
    try {
      const API_BASE_URL = (await import('./config.js')).default;
      const res = await fetch(`${API_BASE_URL}/api/program-dev-enquiry-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryForm.name,
          email: enquiryForm.email,
          phone: enquiryForm.phone,
          company: enquiryForm.company || '',
          program: imgAlt || '', // send program name from frontend
        }),
      });
      if (res.ok) {
        setEnquirySubmitted(true);
      } else {
        alert('Failed to send enquiry.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  // Syllabus logic with normalization
  function normalize(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  const normalizedImgAlt = normalize(imgAlt);
  const syllabusList = SYLLABUS_MAP[normalizedImgAlt] || [];
  const handleSyllabusClick = idx => {
    setExpandedSyllabus(expandedSyllabus === idx ? null : idx);
  };

  return (
    <section className={`programdev-section ${className || ''}`}>
      <div className="programdev-dev">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="programdev-img"
        />
        {enquirySubmitted ? (
          <div className="programdev-enquiry-success">
            <h3>Thank you!</h3>
            <p>Your enquiry has been sent. We will get back to you soon.</p>
          </div>
        ) : (
          <form className="programdev-form" onSubmit={handleEnquirySubmit}>
            <input type="text" name="name" placeholder="Name" value={enquiryForm.name} onChange={handleEnquiryChange} required />
            <input type="email" name="email" placeholder="Email" value={enquiryForm.email} onChange={handleEnquiryChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={enquiryForm.phone} onChange={handleEnquiryChange} required />
            <input type="text" name="company" placeholder="College/Company Name" value={enquiryForm.company} onChange={handleEnquiryChange} required />
            <button type="submit">Enquiry</button>
          </form>
        )}
      </div>
      {/* Syllabus Section */}
      <section className="programdev-syllabus-section" style={{margin:'32px 0'}}>
        <h1 style={{textAlign:'center',color:'#2563eb',fontWeight:800,marginBottom:8,fontSize:28,letterSpacing:0.5}}>
          {imgAlt}
        </h1>
        <h2 style={{marginBottom:18}}>Syllabus</h2>
        <ul style={{listStyle:'none',padding:0,maxWidth:600,margin:'0 auto'}}>
          {syllabusList.length === 0 ? (
            <li style={{color:'#d32f2f',fontWeight:600}}>Syllabus coming soon for this program.</li>
          ) : syllabusList.map((item, idx) => (
            <li key={item.title} style={{marginBottom:10}}>
              <div
                onClick={() => handleSyllabusClick(idx)}
                style={{
                  cursor:'pointer',
                  background:'#f1f5f9',
                  borderRadius:7,
                  padding:'12px 18px',
                  fontWeight:600,
                  color:'#2563eb',
                  boxShadow: expandedSyllabus === idx ? '0 2px 8px #2563eb22' : '0 1px 4px #0001',
                  transition:'box-shadow 0.2s',
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                  fontSize:17
                }}
              >
                <span>{item.title}</span>
                <span style={{fontSize:22,marginLeft:12}}>{expandedSyllabus === idx ? '−' : '+'}</span>
              </div>
              {expandedSyllabus === idx && (
                <ul
                  style={{
                    background: '#fff',
                    borderRadius: 7,
                    marginTop: 4,
                    marginBottom: 2,
                    padding: '10px 0 10px 0',
                    boxShadow: '0 1px 4px #2563eb11',
                    fontSize: 15,
                    borderLeft: '4px solid #2563eb',
                  }}
                >
                  {item.sub.map((sub, i) => (
                    <li
                      key={i}
                      style={{
                        margin: '8px 0',
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        paddingLeft: 18,
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: 8,
                          height: 8,
                          marginTop: 6,
                          borderRadius: '50%',
                          background: '#2563eb',
                          flexShrink: 0,
                        }}
                      ></span>
                      <span style={{lineHeight: 1.6}}>{sub}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {/* Webinar Video (inside syllabus section, click to play) */}
        <WebinarPlayer videoUrl={WEBINAR_VIDEOS[normalizedImgAlt]} />


      </section>
      {/* Certify Your Success Section */}
      <section className="programdev-certify-section" style={{textAlign:'center',margin:'32px 0'}}>
        <h2 style={{marginBottom:24}}>Certify your Success</h2>
        <div style={{display:'flex',justifyContent:'center',gap:32,marginBottom:24,flexWrap:'wrap'}}>
          <img src="/certificate/course completion sample.png" alt="Certificate 1" style={{width:400,maxWidth:'98%',borderRadius:14,boxShadow:'0 4px 18px #0003'}} />
          <img src="/certificate/innternship completion sample.png" alt="Certificate 2" style={{width:400,maxWidth:'98%',borderRadius:14,boxShadow:'0 4px 18px #0003'}} />
        </div>
        <div>
          <img src="/certificate/project completion sample.png" alt="Certificate 3" style={{width:420,maxWidth:'99%',borderRadius:14,boxShadow:'0 4px 22px #0003'}} />
        </div>
      </section>
      {/* Pick Your Plan Section */}
      <section className="programdev-plan-section">
        <h2>Pick Your Plan and Join 50k+ Happy Learners Today!</h2>
        <div className="programdev-plan-cards">
          <div className="programdev-plan-card basic"
            onMouseEnter={e => e.currentTarget.style.border = '2px solid #ff5757'}
            onMouseLeave={e => e.currentTarget.style.border = '2px solid #4998da'}
          >
            <h3>Basic Plan</h3>
            <ul>
              <li>Access to all modules</li>
              <li>Community support</li>
              <li>Certificate on completion</li>
              <li>₹4,999.00</li>
            </ul>
            {cartMessages.basic && (
              <div className={`programdev-cart-message ${cartMessages.basic === 'Added to cart!' ? 'added' : 'error'}`}>{cartMessages.basic}</div>
            )}
            <button
              onMouseDown={e => e.currentTarget.style.background = '#ff5757'}
              onMouseUp={e => e.currentTarget.style.background = '#4998da'}
              onMouseLeave={e => e.currentTarget.style.background = '#4998da'}
              onClick={e => {
                e.preventDefault();
                handleAddCart('basic', 'Basic Plan');
              }}
              disabled={cartMessages.basic === 'The cart is already added'}
            >
              {cartMessages.basic === 'The cart is already added' ? 'Already in Cart' : 'Add Cart'}
            </button>
          </div>
          <div className="programdev-plan-card pro"
            onMouseEnter={e => e.currentTarget.style.border = '2px solid #ff5757'}
            onMouseLeave={e => e.currentTarget.style.border = '2px solid #4998da'}
          >
            <h3>Pro Plan</h3>
            <ul>
              <li>Everything in Basic</li>
              <li>1:1 Mentorship</li>
              <li>Project feedback</li>
              <li>₹9,999.00</li>
            </ul>
            {cartMessages.pro && (
              <div className={`programdev-cart-message ${cartMessages.pro === 'Added to cart!' ? 'added' : 'error'}`}>{cartMessages.pro}</div>
            )}
            <button
              onMouseDown={e => e.currentTarget.style.background = '#ff5757'}
              onMouseUp={e => e.currentTarget.style.background = '#4998da'}
              onMouseLeave={e => e.currentTarget.style.background = '#4998da'}
              onClick={e => {
                e.preventDefault();
                handleAddCart('pro', 'Pro Plan');
              }}
              disabled={cartMessages.pro === 'The cart is already added'}
            >
              {cartMessages.pro === 'The cart is already added' ? 'Already in Cart' : 'Add Cart'}
            </button>
          </div>
          <div className="programdev-plan-card premium"
            onMouseEnter={e => e.currentTarget.style.border = '2px solid #ff5757'}
            onMouseLeave={e => e.currentTarget.style.border = '2px solid #4998da'}
          >
            <h3>Premium Plan</h3>
            <ul>
              <li>Everything in Pro</li>
              <li>Career guidance</li>
              <li>Exclusive webinars</li>
              <li>₹14,999.00</li>
            </ul>
            {cartMessages.premium && (
              <div className={`programdev-cart-message ${cartMessages.premium === 'Added to cart!' ? 'added' : 'error'}`}>{cartMessages.premium}</div>
            )}
            <button
              onMouseDown={e => e.currentTarget.style.background = '#ff5757'}
              onMouseUp={e => e.currentTarget.style.background = '#4998da'}
              onMouseLeave={e => e.currentTarget.style.background = '#4998da'}
              onClick={e => {
                e.preventDefault();
                handleAddCart('premium', 'Premium Plan');
              }}
              disabled={cartMessages.premium === 'The cart is already added'}
            >
              {cartMessages.premium === 'The cart is already added' ? 'Already in Cart' : 'Add Cart'}
            </button>
          </div>
        </div>
      </section>
      {/* Review Section */}
      <ProgramReview programName={imgAlt} />
    </section>
  );
}

export default ProgramDevSection;
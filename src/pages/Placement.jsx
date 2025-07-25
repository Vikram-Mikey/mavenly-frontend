
import React from "react";
import "../styles/placement.css";

const companyLogos = [
  // All college images from public/college image/
  "/college image/college Bh.webp",
  "/college image/college GR.webp",
  "/college image/college KG.webp",
  "/college image/college kpr.webp",
  "/college image/college vit.webp",
  // ...add more if needed
];

const testimonials = [
  {
    name: "Amit Sharma",
    text: "Thanks to Mavenly, I landed my dream job! The placement support and training were top-notch.",
    company: "Infosys",
  },
  {
    name: "Priya Singh",
    text: "The mock interviews and resume workshops made all the difference. Highly recommended!",
    company: "TCS",
  },
  {
    name: "Rahul Verma",
    text: "Great experience! The placement portal is easy to use and the team is very supportive.",
    company: "Wipro",
  },
];

export default function Placement() {
  return (
    <div className="placement-template" style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>

      {/* Hero Section */}
      <section className="placement-hero-template">
        <div className="placement-hero-bg">
          <div className="placement-hero-overlay">
            <div className="placement-hero-content-template">
              <h1 className="placement-title">Launch Your Career with Mavenly Placement Portal</h1>
              <p className="placement-subtitle">Get access to exclusive job opportunities, connect with top recruiters, and receive expert career guidance.</p>
              <a href="#apply" className="placement-btn-primary">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="placement-intro" style={{ background: 'rgba(30,41,59,0.85)', padding: '32px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ color: '#38bdf8', fontWeight: 700, marginBottom: 12 }}>Why Choose Mavenly?</h2>
          <p style={{ fontSize: '1.15rem', color: '#e0e7ef' }}>
            At Mavenly, we are committed to bridging the gap between talent and opportunity. Our placement portal is designed to empower students and professionals with the right skills, resources, and connections to land their dream jobs. Join a thriving community and take the next step in your career journey!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="placement-stats-template">
        <div className="placement-stats-grid">
          <div className="placement-stat-item">
            <h2 style={{ color: '#38bdf8' }}>500+</h2>
            <span>Students Placed</span>
          </div>
          <div className="placement-stat-item">
            <h2 style={{ color: '#38bdf8' }}>100+</h2>
            <span>Recruiting Companies</span>
          </div>
          <div className="placement-stat-item">
            <h2 style={{ color: '#38bdf8' }}>95%</h2>
            <span>Placement Rate</span>
          </div>
        </div>
      </section>

      {/* Placement Process Section */}
      <section className="placement-process" style={{ background: '#18181b', padding: '40px 0' }}>
        <h2 className="section-title" style={{ color: '#38bdf8' }}>Our Placement Process</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: '#222', borderRadius: 10, padding: 24, minWidth: 220, maxWidth: 260 }}>
            <h3 style={{ color: '#38bdf8', fontWeight: 700 }}>1. Register</h3>
            <p style={{ color: '#e0e7ef' }}>Sign up and complete your profile to get started.</p>
          </div>
          <div style={{ background: '#222', borderRadius: 10, padding: 24, minWidth: 220, maxWidth: 260 }}>
            <h3 style={{ color: '#38bdf8', fontWeight: 700 }}>2. Skill Assessment</h3>
            <p style={{ color: '#e0e7ef' }}>Take assessments to showcase your strengths and interests.</p>
          </div>
          <div style={{ background: '#222', borderRadius: 10, padding: 24, minWidth: 220, maxWidth: 260 }}>
            <h3 style={{ color: '#38bdf8', fontWeight: 700 }}>3. Apply & Interview</h3>
            <p style={{ color: '#e0e7ef' }}>Apply to jobs, attend mock interviews, and get expert feedback.</p>
          </div>
          <div style={{ background: '#222', borderRadius: 10, padding: 24, minWidth: 220, maxWidth: 260 }}>
            <h3 style={{ color: '#38bdf8', fontWeight: 700 }}>4. Get Placed</h3>
            <p style={{ color: '#e0e7ef' }}>Receive offers and start your professional journey!</p>
          </div>
        </div>
      </section>

      {/* Job Opportunities Section */}
      <section className="placement-jobs-template">
        <h2 className="section-title" style={{ color: '#38bdf8' }}>Latest Job Opportunities</h2>
        <div className="placement-jobs-list">
          {/* Software Developer */}
          <div className="placement-job-card" style={{ background: '#18181b', color: '#e0e7ef' }}>
            <h3 style={{ color: '#38bdf8' }}>Software Developer</h3>
            <p style={{ color: '#e0e7ef' }}>Infosys &nbsp; | &nbsp; Bangalore</p>
            <span className="job-type" style={{ background: '#38bdf8', color: '#000' }}>Full Time</span>
            <div style={{ margin: '10px 0', color: '#e0e7ef' }}>Salary: ₹6-10 LPA</div>
            <div style={{ fontSize: '0.98rem', color: '#e0e7ef' }}>Skills: React, Node.js, SQL</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="#apply" className="placement-btn-secondary">Apply Now</a>
              <a
                href="mailto:placements@mavenly.com?subject=Resume%20for%20Software%20Developer%20at%20Infosys"
                className="placement-btn-secondary"
                style={{ background: '#38bdf8', color: '#000', fontWeight: 600 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send Resume
              </a>
            </div>
          </div>
          {/* Data Analyst */}
          <div className="placement-job-card" style={{ background: '#18181b', color: '#e0e7ef' }}>
            <h3 style={{ color: '#38bdf8' }}>Data Analyst</h3>
            <p style={{ color: '#e0e7ef' }}>TCS &nbsp; | &nbsp; Mumbai</p>
            <span className="job-type" style={{ background: '#38bdf8', color: '#000' }}>Full Time</span>
            <div style={{ margin: '10px 0', color: '#e0e7ef' }}>Salary: ₹5-8 LPA</div>
            <div style={{ fontSize: '0.98rem', color: '#e0e7ef' }}>Skills: Python, Excel, PowerBI</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="#apply" className="placement-btn-secondary">Apply Now</a>
              <a
                href="mailto:placements@mavenly.com?subject=Resume%20for%20Data%20Analyst%20at%20TCS"
                className="placement-btn-secondary"
                style={{ background: '#38bdf8', color: '#000', fontWeight: 600 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send Resume
              </a>
            </div>
          </div>
          {/* Digital Marketing Executive */}
          <div className="placement-job-card" style={{ background: '#18181b', color: '#e0e7ef' }}>
            <h3 style={{ color: '#38bdf8' }}>Digital Marketing Executive</h3>
            <p style={{ color: '#e0e7ef' }}>Wipro &nbsp; | &nbsp; Hyderabad</p>
            <span className="job-type" style={{ background: '#38bdf8', color: '#000' }}>Full Time</span>
            <div style={{ margin: '10px 0', color: '#e0e7ef' }}>Salary: ₹4-7 LPA</div>
            <div style={{ fontSize: '0.88rem', color: '#e0e7ef' }}>Skills: SEO, Google Ads,Content Writing</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="#apply" className="placement-btn-secondary">Apply Now</a>
              <a
                href="mailto:placements@mavenly.com?subject=Resume%20for%20Digital%20Marketing%20Executive%20at%20Wipro"
                className="placement-btn-secondary"
                style={{ background: '#38bdf8', color: '#000', fontWeight: 600 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="placement-companies-template">
        <h2 className="section-title" style={{ color: '#38bdf8' }}>Our Recruiters</h2>
        <div className="placement-company-logos-grid">
          {companyLogos.map((logo, idx) => (
            <div className="placement-company-logo-wrapper" key={idx} title={logo.replace('/','').replace('.png','').replace('.jpg','').replace(/-/g,' ')}>
              <img src={logo} alt="Company Logo" className="placement-company-logo" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="placement-testimonials-template">
        <h2 className="section-title" style={{ color: '#38bdf8' }}>Success Stories</h2>
        <div className="placement-testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="placement-testimonial-card" key={idx} style={{ background: '#18181b', color: '#e0e7ef' }}>
              <p className="placement-testimonial-text">“{t.text}”</p>
              <div className="placement-testimonial-author">
                <strong style={{ color: '#38bdf8' }}>{t.name}</strong> <span style={{ color: '#e0e7ef' }}>({t.company})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration/Contact Section */}
      <section className="placement-register-template" id="apply">
        <div className="placement-register-content">
          <h2>Ready to Get Placed?</h2>
          <p>Register now and take the first step towards your dream career!</p>
          <a href="/Signup" className="placement-btn-primary">Register Now</a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="placement-faq" style={{ background: '#18181b', padding: '40px 0' }}>
        <h2 className="section-title" style={{ color: '#38bdf8' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: 800, margin: '0 auto', color: '#e0e7ef' }}>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ color: '#38bdf8' }}>Q: Who can register on the Mavenly Placement Portal?</strong>
            <div>A: Any student or professional looking for job opportunities can register and benefit from our resources.</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ color: '#38bdf8' }}>Q: Is there any registration fee?</strong>
            <div>A: No, registration is completely free for all users.</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ color: '#38bdf8' }}>Q: How do I get placement support?</strong>
            <div>A: After registering, you will have access to our placement team, mock interviews, and resume workshops.</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ color: '#38bdf8' }}>Q: Can I apply to multiple jobs?</strong>
            <div>A: Yes, you can apply to as many jobs as you like through the portal.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

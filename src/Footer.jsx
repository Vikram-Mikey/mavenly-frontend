// Helper to scroll to top and navigate
function scrollToTopAndNavigate(navigate, path) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  navigate(path);
}
import { useNavigate } from 'react-router-dom';
import './styles/footer.css';


function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer">
        <section className="footer-dev-section">
          <div className="footer-dev">
            <img src="/admin-ajax.png" alt="Dev" className="footer-dev-img" />
            <div className="footer-dev-content">
              <div className="footer-help-title">Need help?</div>
              <div className="footer-help-text">Learn. Grow. Succeed. Your future starts here with Mavenly!</div>
              <div className="footer-help-contact">Have any questions or need assistance? Our team is always here to help—reach out to us</div>
            </div>
            <div className="footer-dev-contact-button">
              <span className="footer-contactus-label" style={{cursor: 'pointer'}} onClick={() => window.location.href='/contact'}>Contact Us</span>
            </div>
          </div>
        </section>
        <section className="footer-contact-section">
          <div className="footer-contact-left">
            <img src="/mavenly logo.png" alt="Mavenly Logo" className="footer-contact-left-logo" />
            <div className="footer-contact-left-title">Come say hello at our office:</div>
            <div className="footer-contact-left-address">
              451, Kamarajar Road, Peelamedu,<br/> Lakshmi Ammal Layout, Hopes College,<br/> Coimbatore- 641014, Tamil Nadu<br />
              hr@mavenly.in<br />
              +91 63808 06142
            </div>
          </div>
          <div className="footer-contact-center">
            <div className="footer-contact-center-col">
              <div className="footer-contact-center-col-title">Services</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/programs')}>E-Learning</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/programs')}>Bootcamp</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/programs')}>Webinar</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/programs')}>Certifications</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/testimonial')}>Mentoring</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/contact')}>Corporate Services</div>
            </div>
            <div className="footer-contact-center-col">
              <div className="footer-contact-center-col-title">Company</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/about')}>About us</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/testimonial')}>Leadership</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/placement')}>Careers</div>
              <div className="footer-contact-center-col-item" style={{cursor:'pointer'}} onClick={() => scrollToTopAndNavigate(navigate, '/testimonial')}>Testimonials</div>
              <div className="footer-contact-center-col-item-link" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); window.location.href='/refund-cancellation-policy'; }}>Refund/Cancellation Policy</div>
            </div>
          </div>
          <div className="footer-contact-right">
            <img
              src="/we-are-registered.webp"
              alt="We are registered"
              className="footer-contact-right-img"
            />
            <div className="footer-contact-right-title">Mavenly Edutech Pvt. Ltd.</div>
            <div className="footer-contact-right-desc">
              Sign up our newsletter to get update information, news and free insight.
            </div>
            <form className="footer-contact-right-form" onSubmit={e => { e.preventDefault(); navigate('/signup'); }}>
              <input
                type="email"
                placeholder="Your email"
                required
                className="footer-contact-right-input"
              />
              <button
                type="submit"
                className="footer-contact-right-btn"
              >
                Signup
              </button>
            </form>
          </div>
        </section>
        <p>&copy; {new Date().getFullYear()} Mavenly. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Footer;
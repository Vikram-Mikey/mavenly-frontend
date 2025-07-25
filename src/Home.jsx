import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './styles/home-custom.css';
import './App.css';

const PROGRAMS = [
  { name: 'Full Stack Development', img: '/Full Stack Development.jpg' },
  { name: 'Data Analytics', img: '/Data Analytics.jpg' },
  { name: 'Cybersecurity', img: '/Cybersecurity.jpg' },
  { name: 'Digital Marketing', img: '/Digital Marketing.jpg' },
  { name: 'Finance Program', img: '/Finance Program.jpg' },
  { name: 'UI/UX Designing', img: '/UI Designing.jpg' },
  { name: 'AI', img: '/ai.jpg' },
  { name: 'Cloud Computing', img: '/cloud computing.jpeg' },
  { name: 'App Development', img: '/app development.webp' },
  { name: 'Embedded System', img: '/embedded system.jpeg' },
  { name: 'Auto Cad', img: '/AutoCAD.webp' },
  { name: 'Human Resource Management', img: '/mhr.webp' },
  { name: 'Medical Coding', img: '/medical coding.jpeg' },
  { name: 'Psychology', img: '/psychology.jpeg' },
  { name: 'Python', img: '/python.png' },
  { name: 'Java', img: '/java.png' },
  { name: 'C', img: '/c.png' },
  { name: 'Cpp', img: '/cpp.png' },
  { name: 'PowerBI', img: '/powerbi.png' },
  { name: 'Excel', img: '/excel.png' }
];

function Home() {
  const navigate = useNavigate();
  const logosRef = useRef(null);

  useEffect(() => {
    const logos = logosRef.current;
    if (logos) {
      logos.style.transition = 'transform 8s linear';
      logos.style.transform = 'translateX(-60%)';
    }
  }, []);
  const [selectedType, setSelectedType] = useState('Technology');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const scrollRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const typePrograms = {
    Technology: [
      { src: '/ai.jpg', alt: 'AI', label: 'Artificial Intelligence', onClick: () => navigate('/ai') },
      { src: '/cloud computing.jpeg', alt: 'Cloud Computing', label: 'Cloud Computing', onClick: () => navigate('/cloud-computing') },
      { src: '/Cybersecurity.jpg', alt: 'Cybersecurity', label: 'Cybersecurity', onClick: () => navigate('/cybersecurity') },
      { src: '/Data Analytics.jpg', alt: 'Data Analytics', label: 'Data Analytics', onClick: () => navigate('/data-analytics') },
      { src: '/app development.webp', alt: 'App Development', label: 'App Development', onClick: () => navigate('/app-development') },
      { src: '/embedded system.jpeg', alt: 'Embedded System', label: 'Embedded System', onClick: () => navigate('/embedded-system') },
      { src: '/Full Stack Development.jpg', alt: 'Full Stack Development', label: 'Full Stack Development', onClick: () => navigate('/full-stack-development') },
    ],
    'Programming Language': [
      { src: '/python.png', alt: 'Python', label: 'Python', onClick: () => navigate('/python') },
      { src: '/java.png', alt: 'Java', label: 'Java', onClick: () => navigate('/java') },
      { src: '/c.png', alt: 'C', label: 'C', onClick: () => navigate('/c') },
      { src: '/cpp.png', alt: 'C++', label: 'C++', onClick: () => navigate('/cpp') },
      { src: '/powerbi.png', alt: 'Power BI', label: 'Power BI', onClick: () => navigate('/powerbi') },
      { src: '/excel.png', alt: 'Excel', label: 'Excel', onClick: () => navigate('/excel') },
    ],
    Business: [
      { src: '/Finance Program.jpg', alt: 'Finance Program', label: 'Finance Program', onClick: () => navigate('/finance-program') },
      { src: '/mhr.webp', alt: 'Human Resource Management', label: 'Human Resource', onClick: () => navigate('/human-resource-management') },
      { src: '/Digital Marketing.jpg', alt: 'Digital Marketing', label: 'Digital Marketing', onClick: () => navigate('/digital-marketing') },
    ],
    Medical: [
      { src: '/medical coding.jpeg', alt: 'Medical Coding', label: 'Medical Coding', onClick: () => navigate('/medical-coding') },
      { src: '/psychology.jpeg', alt: 'Psychology', label: 'Psychology', onClick: () => navigate('/psychology') },
    ],
    Design: [
      { src: '/UI Designing.jpg', alt: 'UI/UX Designing', label: 'UI/UX Design', onClick: () => navigate('/ui-designing') },
    ],
    Mechanics: [
      { src: '/AutoCAD.webp', alt: 'Auto Cad', label: 'Auto CAD', onClick: () => navigate('/auto-cad') },
    ],
    Freelancing: [
      { src: '/Digital Marketing.jpg', alt: 'freelancing Digital Marketing', label: 'Digital Marketing', onClick: () => navigate('/freelancing/Digital-Marketing') },
      { src: '/Finance Program.jpg', alt: 'freelancing Finance Program', label: 'Finance Program', onClick: () => navigate('/freelancing/Finance-Program') },
      { src: '/UI Designing.jpg', alt: 'freelancing UI/UX Designing', label: 'UI/UX Design', onClick: () => navigate('/freelancing/UI-Designing') },
      { src: '/Full Stack Development.jpg', alt: 'freelancing Full Stack Development', label: 'Full Stack Development', onClick: () => navigate('/freelancing/Full-Stack-Development') },
    ]
  };

  return (
    <>
      <div className="home-text-container with-image">
        {/* Flex row: text left, image right */}
        <div className="home-hero-flex-row">
          <div className="home-text-content">
            <div className="home-career-badge">
              Empowering Your Career
            </div>
            <h1 className="highlight">
              Upskill to the <span className="highlight-red">top 1%</span> Professional by Learning from Expert-Led Mentorship Program
            </h1>
            <p>Ready to learn new skills, switch careers, or level up? You’re in the right place! We empower learners with job-ready skills in technology, design, business, and marketing.</p>
            <div
              className="discover-more-btn"
              onClick={() => navigate('/programs')}
            >
              Discover more
            </div>
          </div>
          <img src="/Brain-image.jpg" alt="Brain" className="home-brain-image" />
        </div>
      </div>
      <section className="featured-programs-section">
        <h2>Featured Online Programs</h2>
        <p>Master in-demand skills with our expert-led, hands-on programs designed to help you grow, earn, and succeed in the digital world!</p>
        <div className={`featured-programs-flex${isMobile ? ' mobile' : ''}`}> 
          <div
            className={`select-type-dev${isMobile ? ' mobile' : ''}`}
          >
            <div className="select-type-title">Select Type</div>
            {['Technology', 'Programming Language', 'Business', 'Medical', 'Design', 'Mechanics', 'Freelancing'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`select-type-btn${selectedType === type ? ' selected' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div
            className={`programs-container${isMobile ? ' mobile' : ''}`}
            ref={scrollRef}
          >{isMobile ? (
            <div className="mobile-programs-scroll">
              <div className="mobile-programs-inline-flex">
                {(typePrograms[selectedType] || []).map((program, idx) => (
                  <div
                    key={program.alt + '-scroll'}
                    className="program-card mobile"
                    onClick={program.onClick}
                  >
                    <img
                      src={program.src}
                      alt={program.alt}
                      className="program-card-img mobile"
                    />
                    <span className="program-card-label">{program.label}</span>
                    <button
                      className="enroll-now-btn"
                      onClick={e => { e.stopPropagation(); program.onClick(); }}
                    >
                      Enroll now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            (() => {
              const featured = typePrograms[selectedType] || [];
              const isTwoCol = windowWidth >= 903 && windowWidth <= 1070;
              if (isTwoCol) {
                // Render all cards directly as children for grid
                return featured.map((program) => (
                  <div
                    key={program.alt + '-scroll'}
                    className="program-card"
                    onClick={program.onClick}
                  >
                    <img
                      src={program.src}
                      alt={program.alt}
                      className="program-card-img"
                    />
                    <span className="program-card-label">{program.label}</span>
                    <button
                      className="enroll-now-btn"
                      onClick={e => { e.stopPropagation(); program.onClick(); }}
                    >
                      Enroll now
                    </button>
                  </div>
                ));
              } else {
                // Default: chunk into rows of 3
                const chunkSize = 3;
                const rows = [];
                for (let i = 0; i < featured.length; i += chunkSize) {
                  rows.push(featured.slice(i, i + chunkSize));
                }
                return rows.map((row, rowIdx) => (
                  <div key={rowIdx} className="programs-row">
                    {row.map((program) => (
                      <div
                        key={program.alt + '-scroll'}
                        className="program-card"
                        onClick={program.onClick}
                      >
                        <img
                          src={program.src}
                          alt={program.alt}
                          className="program-card-img"
                        />
                        <span className="program-card-label">{program.label}</span>
                        <button
                          className="enroll-now-btn"
                          onClick={e => { e.stopPropagation(); program.onClick(); }}
                        >
                          Enroll now
                        </button>
                      </div>
                    ))}
                  </div>
                ));
              }
            })()
          )}
          </div>
        </div>
      </section>
      <section className="learners-info-section">
        <div className="learners-info-content">
          <h2>Learners from 100+ Colleges have taken our mentorship program</h2>
          <p>
            Learn from industry experts, work on real-world projects, earn valuable certifications, and take your career to the next level—all at your own pace!
          </p>
        </div>
        <div className="learners-college-marquee">
          <marquee behavior="scroll" direction="left" scrollamount="8" className="college-marquee">
            <div className="college-marquee-flex">
              {Array.from({length: 10}).flatMap((_, repeatIdx) =>
  [
    'college Bh.webp',
    'college GR.webp',
    'college KG.webp',
    'college kpr.webp',
    'college Kumaraguru.webp',
    'college psg icon.webp',
    'college psgrkcw.webp',
    'college rathinam.webp',
    'college sns.webp',
    'college srikrishna.webp',
    'college vit.webp',
    'karpagam icon.jpeg',
  ].map((img, idx) => (
    <img key={repeatIdx + '-' + idx} src={`/college image/${img}`} alt={img.replace('.webp', '').replace('.jpeg', '')} className="college-marquee-img" />
  ))
)}
            </div>
          </marquee>
        </div>
        <section className="start-learning-section">
          <div className="start-learning-content">
            <span className="start-learning-highlight">Start your learning journey today! Enroll now in our online Program.</span><br/>
            Whether you’re a beginner, a working professional, or an entrepreneur, our Programs are designed to help you learn, grow, and stay ahead in your career!
            <div
              className="discover-more-btn"
              onClick={() => window.location.href='/programs'}
            >
              Discover more
            </div>
          </div>
        </section>
      </section>
      <section className="about-popular-classes-section">
        <div className="about-popular-classes-content">
          <h2>
            Our Popular Classes
          </h2>
          <div
            className={`popular-class-dev${isMobile ? ' mobile' : ''}`}
          >
            {isMobile ? (
              <div className="popular-programs-scroll">
                <div className="popular-programs-inline-flex">
                  <div className="program-card">
                    <img src="/Cybersecurity.jpg" alt="Cybersecurity" className="program-card-img" />
                    <span className="program-card-label">Cybersecurity</span>
                  </div>
                  <div className="program-card">
                    <img src="/Data Analytics.jpg" alt="Data Analytics" className="program-card-img" />
                    <span className="program-card-label">Data Analytics</span>
                  </div>
                  <div className="program-card">
                    <img src="/ai.jpg" alt="Artificial Intelligence" className="program-card-img" />
                    <span className="program-card-label">Artificial Intelligence</span>
                  </div>
                  <div className="program-card">
                    <img src="/embedded system.jpeg" alt="Embedded System" className="program-card-img" />
                    <span className="program-card-label">Embedded System</span>
                  </div>
                  <div className="program-card">
                    <img src="/app development.webp" alt="App Development" className="program-card-img" />
                    <span className="program-card-label">App Development</span>
                  </div>
                  <div className="program-card">
                    <img src="/medical coding.jpeg" alt="Medical Coding" className="program-card-img" />
                    <span className="program-card-label">Medical Coding</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="popular-classes-row">
                  <div className="program-card">
                    <img src="/Cybersecurity.jpg" alt="Cybersecurity" className="program-card-img" />
                    <span className="program-card-label">Cybersecurity</span>
                  </div>
                  <div className="program-card">
                    <img src="/Data Analytics.jpg" alt="Data Analytics" className="program-card-img" />
                    <span className="program-card-label">Data Analytics</span>
                  </div>
                  <div className="program-card">
                    <img src="/ai.jpg" alt="Artificial Intelligence" className="program-card-img" />
                    <span className="program-card-label">Artificial Intelligence</span>
                  </div>
                </div>
                <div className="popular-classes-row">
                  <div className="program-card">
                    <img src="/embedded system.jpeg" alt="Embedded System" className="program-card-img" />
                    <span className="program-card-label">Embedded System</span>
                  </div>
                  <div className="program-card">
                    <img src="/app development.webp" alt="App Development" className="program-card-img" />
                    <span className="program-card-label">App Development</span>
                  </div>
                  <div className="program-card">
                    <img src="/medical coding.jpeg" alt="Medical Coding" className="program-card-img" />
                    <span className="program-card-label">Medical Coding</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="why-choose-us-section">
        <div className="why-choose-us-content">
          <h2>Why Choose Us</h2>
          <p className="why-choose-us-sub">It's the bright one, it's the right one, that's education.</p>
          <p className="why-choose-us-desc">
            Learn from industry experts, work on real projects, earn valuable certifications, and take your career to the next level—all at your own pace!
          </p>
          <div className="why-choose-us-features">
            <div className="why-feature live-sessions">
              <h3>Engaging Live Sessions</h3>
              <p>Learn in real-time with interactive classes designed to keep you involved and inspired.</p>
            </div>
            <div className="why-feature certifications">
              <h3>Industry-Recognized Certifications</h3>
              <p>Earn credentials that matter — valued by top recruiters and recognized across industries.</p>
            </div>
            <div className="why-feature mentorship">
              <h3>Mentorship by Experts</h3>
              <p>Get guided by seasoned professionals who’ve been there, done that — and are here to help you grow.</p>
            </div>
            <div className="why-feature portfolio">
              <h3>Build a Winning Portfolio</h3>
              <p>Work on real-world projects that showcase your skills and set you apart.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="faq-section">
        <div className="faq-content">
          <h2>Common Questions</h2>
          <h3>Frequently Asked Questions</h3>
          <p>
            Get answers to frequently asked questions about our bootcamps, enrollment, and learning experience.
          </p>
          <div className="faq-questions">
            <div className="faq-col">
              <p><strong className="faq-q">Where will my online classes take place?</strong><br/>All our Programs are 100% online. You can access them through your Mavenly account on any device—laptop, tablet, or mobile—anytime, anywhere! - Mostly on Google Meet or Zoom</p>
              <p><strong className="faq-q">Do I get lifetime access to my Programs?</strong><br/>Yes! 🎉 Once you enroll in a Program, you get lifetime access, including any future updates to the content.</p>
              <p><strong className="faq-q">How do I activate my Mavenly Program?</strong><br/>Once you purchase a Program, you’ll receive an email with login details. Just sign in to your Mavenly account, and you’re good to go!</p>
              <p><strong className="faq-q">Can I retake a Program multiple times?</strong><br/>Absolutely! You can watch lessons as many times as you need and revise at your own pace.</p>
            </div>
            <div className="faq-col">
              <p><strong className="faq-q">How many Program can I enroll in per month?</strong><br/>There’s no limit! You can enroll in as many Programs as you like and learn at your own pace.</p>
              <p><strong className="faq-q">What if I’m not available for a particular month?</strong><br/>No worries! Since all Programs are self-paced, you can start, pause, and resume whenever it’s convenient for you.</p>
              <p><strong className="faq-q">Is my Program access valid for a lifetime?</strong><br/>Yes! Once you’ve enrolled, the Program stays permanently available in your Mavenly account.</p>
              <p><strong className="faq-q">Will I receive certifications for all Programs?</strong><br/>Yes, after successfully completing a Program, you’ll receive a verified digital certificate, which you can showcase on LinkedIn, your resume, or job applications.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

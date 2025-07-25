import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/testimonials.css';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Full Stack Developer',
    company: 'Infosys',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: "Mavenly's Full Stack Development program was a game changer for me. The mentors were supportive and the projects helped me build real skills. I landed my first developer job within 2 months of completing the course!",
    stars: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Data Analyst',
    company: 'Deloitte',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: "The Data Analytics course was very practical and hands-on. The placement support team helped me prepare for interviews and I got placed at Deloitte. Highly recommend Mavenly!",
    stars: 5,
  },
  {
    name: 'Sneha Patil',
    role: 'UI/UX Designer',
    company: 'Zomato',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: "I loved the UI/UX Designing program. The live projects and feedback from industry experts made all the difference. I am now working as a designer at a top startup!",
    stars: 5,
  },
];

export default function Testimonials() {
  const navigate = useNavigate();
  return (
    <>
      <section className="nexo-hero">
        <div className="nexo-hero-title">Hear from Our Learners</div>
        <div className="nexo-hero-sub">Real stories. Real results. Discover how Mavenly has helped students achieve their career dreams.</div>
        <div style={{display:'flex', justifyContent:'center', gap:32, margin:'32px 0 0 0', flexWrap:'wrap'}}>
          <div style={{background:'rgba(255,255,255,0.09)', borderRadius:12, padding:'18px 32px', color:'#fff', minWidth:180, textAlign:'center', boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontSize:'2.1rem', fontWeight:700, color:'#ffd700'}}>98%</div>
            <div style={{fontSize:'1.08rem', color:'#e3e7f7'}}>Placement Rate</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.09)', borderRadius:12, padding:'18px 32px', color:'#fff', minWidth:180, textAlign:'center', boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontSize:'2.1rem', fontWeight:700, color:'#2563eb'}}>5000+</div>
            <div style={{fontSize:'1.08rem', color:'#e3e7f7'}}>Students Trained</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.09)', borderRadius:12, padding:'18px 32px', color:'#fff', minWidth:180, textAlign:'center', boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontSize:'2.1rem', fontWeight:700, color:'#ff5757'}}>100+</div>
            <div style={{fontSize:'1.08rem', color:'#e3e7f7'}}>Hiring Partners</div>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', gap:20, marginTop:36}}>
          <button className="nexo-cta-btn" onClick={() => navigate('/programs')}>Join the Success &rarr;</button>
          <button className="nexo-cta-btn" style={{background:'#2563eb', color:'#fff', boxShadow:'0 2px 12px #2563eb44'}} onClick={() => navigate('/placement')}>View Placement Support</button>
        </div>
      </section>

      {/* Mentor/Testimonials Section (already present) */}
      <section className="nexo-testimonials-section">
        <div className="nexo-testimonials-title">What Our Learners Say</div>
        <div className="nexo-gradient-divider"></div>
        <div className="nexo-testimonials-list">
          {testimonials.map((t, i) => (
            <div className="nexo-testimonial-card" key={i}>
              <img className="nexo-testimonial-avatar" src={t.avatar} alt={t.name} />
              <div className="nexo-testimonial-name">{t.name}</div>
              <div className="nexo-testimonial-role">{t.role} @ {t.company}</div>
              <div className="nexo-testimonial-text">“{t.text}”</div>
              <div className="nexo-testimonial-stars">{'★'.repeat(t.stars)}{'☆'.repeat(5-t.stars)}</div>
            </div>
          ))}
        </div>
        <div style={{margin:'48px auto 0 auto', maxWidth:700, background:'rgba(255,255,255,0.07)', borderRadius:14, padding:'28px 24px', textAlign:'center', color:'#fff', boxShadow:'0 2px 12px #2563eb22'}}>
          <div style={{fontSize:'1.25rem', fontWeight:600, marginBottom:8, color:'#2563eb'}}>Companies Hiring Our Graduates</div>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:24, marginTop:12}}>
            <img src="/college image/college GR.webp" alt="Infosys" style={{height:36, background:'#fff', borderRadius:8, padding:'4px 12px'}} />
            <img src="/college image/college Bh.webp" alt="Deloitte" style={{height:36, background:'#fff', borderRadius:8, padding:'4px 12px'}} />
            <img src="/college image/college KG.webp" alt="Zomato" style={{height:36, background:'#fff', borderRadius:8, padding:'4px 12px'}} />
            <img src="/college image/college kpr.webp" alt="TCS" style={{height:36, background:'#fff', borderRadius:8, padding:'4px 12px'}} />
            <img src="/college image/college vit.webp" alt="Wipro" style={{height:36, background:'#fff', borderRadius:8, padding:'4px 12px'}} />
          </div>
        </div>
      </section>
      {/* Student Video Reviews Section - moved below mentor section and expanded */}
      <section style={{background:'#1b2236', padding:'56px 0 64px 0', marginTop:0}}>
        <div style={{color:'#fff', fontSize:'2rem', fontWeight:700, textAlign:'center', marginBottom:36}}>Student Video Reviews</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:32, justifyContent:'center', marginBottom:40}}>
          <div style={{background:'rgba(255,255,255,0.08)', borderRadius:18, boxShadow:'0 4px 24px #0002', padding:24, maxWidth:340, minWidth:260, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <video width="260" height="160" controls poster="/student1.jpg" style={{borderRadius:12, marginBottom:14}}>
              <source src="/student1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{fontWeight:600, color:'#ffd700', marginBottom:4}}>Priya Sharma</div>
            <div style={{color:'#b3b8c5', fontSize:'0.98rem', marginBottom:8}}>Full Stack Developer @ Infosys</div>
            <div style={{color:'#e3e7f7', fontSize:'1.08rem', textAlign:'center'}}>
              "The hands-on projects and mentorship at Mavenly made all the difference. Watch my journey!"
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.08)', borderRadius:18, boxShadow:'0 4px 24px #0002', padding:24, maxWidth:340, minWidth:260, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <video width="260" height="160" controls poster="/student2.jpg" style={{borderRadius:12, marginBottom:14}}>
              <source src="/student2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{fontWeight:600, color:'#2563eb', marginBottom:4}}>Rahul Verma</div>
            <div style={{color:'#b3b8c5', fontSize:'0.98rem', marginBottom:8}}>Data Analyst @ Deloitte</div>
            <div style={{color:'#e3e7f7', fontSize:'1.08rem', textAlign:'center'}}>
              "From learning to landing a job, Mavenly supported me every step. Check out my story!"
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.08)', borderRadius:18, boxShadow:'0 4px 24px #0002', padding:24, maxWidth:340, minWidth:260, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <video width="260" height="160" controls poster="/student3.jpg" style={{borderRadius:12, marginBottom:14}}>
              <source src="/student3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{fontWeight:600, color:'#ff5757', marginBottom:4}}>Divya S</div>
            <div style={{color:'#b3b8c5', fontSize:'0.98rem', marginBottom:8}}>Software Engineer @ TCS</div>
            <div style={{color:'#e3e7f7', fontSize:'1.08rem', textAlign:'center'}}>
              "Mavenly's bootcamp gave me the confidence to ace my interviews. My journey is here!"
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.08)', borderRadius:18, boxShadow:'0 4px 24px #0002', padding:24, maxWidth:340, minWidth:260, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <video width="260" height="160" controls poster="/student4.jpg" style={{borderRadius:12, marginBottom:14}}>
              <source src="/student4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{fontWeight:600, color:'#2563eb', marginBottom:4}}>Suresh R</div>
            <div style={{color:'#b3b8c5', fontSize:'0.98rem', marginBottom:8}}>Embedded Engineer @ Wipro</div>
            <div style={{color:'#e3e7f7', fontSize:'1.08rem', textAlign:'center'}}>
              "The live projects and real-world tasks at Mavenly were invaluable. Watch my experience!"
            </div>
          </div>
        </div>
        <div style={{color:'#fff', fontSize:'1.4rem', fontWeight:600, textAlign:'center', margin:'48px 0 18px 0'}}>Student Review Comments</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:24, justifyContent:'center'}}>
          <div style={{background:'rgba(255,255,255,0.10)', borderRadius:14, padding:'18px 22px', color:'#fff', maxWidth:340, minWidth:220, boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontWeight:600, marginBottom:6}}>Amit Kumar</div>
            <div style={{fontSize:'1.04rem', color:'#e3e7f7'}}>
              "The placement support was excellent. I got my dream job within weeks of finishing the course!"
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.10)', borderRadius:14, padding:'18px 22px', color:'#fff', maxWidth:340, minWidth:220, boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontWeight:600, marginBottom:6}}>Divya S</div>
            <div style={{fontSize:'1.04rem', color:'#e3e7f7'}}>
              "Mentors were always available and the curriculum was up-to-date with industry needs."
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.10)', borderRadius:14, padding:'18px 22px', color:'#fff', maxWidth:340, minWidth:220, boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontWeight:600, marginBottom:6}}>Suresh R</div>
            <div style={{fontSize:'1.04rem', color:'#e3e7f7'}}>
              "The live projects gave me real confidence. Highly recommend Mavenly!"
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.10)', borderRadius:14, padding:'18px 22px', color:'#fff', maxWidth:340, minWidth:220, boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontWeight:600, marginBottom:6}}>Priya Sharma</div>
            <div style={{fontSize:'1.04rem', color:'#e3e7f7'}}>
              "The support from mentors and peers was amazing. I felt prepared for my first job!"
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.10)', borderRadius:14, padding:'18px 22px', color:'#fff', maxWidth:340, minWidth:220, boxShadow:'0 2px 12px #2563eb22'}}>
            <div style={{fontWeight:600, marginBottom:6}}>Rahul Verma</div>
            <div style={{fontSize:'1.04rem', color:'#e3e7f7'}}>
              "Great curriculum and placement support. I recommend Mavenly to all my friends."
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

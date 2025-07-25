import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './styles/about.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className='about-page'>
      <section className="about-page-text">
        <div className="about-page-text-header">
          <h2>About</h2>
        </div>
        <div className="about-page-text-desc">
          <p>
            Join our community of learners and start your journey towards success.
          </p>
        </div>
      </section>
      <section className="about-page-section-content">
        <div className='About-page-content'>
          <h2>Who we are</h2>
          <p style={{fontSize: '1.1rem', marginBottom: '1.2rem', fontWeight: 500}}>
            Empowering learners with industry-relevant skills for a brighter future.
          </p>
          <p>
            We are passionate about empowering learners with industry-relevant skills that drive success. Whether you’re a student, professional, or entrepreneur, our expert-led Programs help you learn, grow, and stay ahead in the digital era.
          </p>
          <h3>Online Program & Webinar</h3>
          <p>
            Gain access to high-quality, self-paced Programs and live webinars led by industry experts, designed to provide real-world insights and hands-on learning.
          </p>
          <h3>Expert Instructors</h3>
          <p>
            Our courses are led by seasoned educators and industry professionals who bring practical knowledge and real-world experience to every lesson. Their dedication ensures that students not only reach their learning objectives but also build the skills needed to thrive in their careers.
          </p>
          <h3>Certifications & Career Mentorship</h3>
          <p>
            Earn globally recognized certifications and get career guidance from industry professionals to boost your resume and unlock new career opportunities.
          </p>
        </div>
        <div className="about-image-container">
          <img src="/about page employe.jpeg" alt="About Employees" />
        </div>
      </section>
      <section className="about-certification-section">
        <h2>
          What advantages does certification from MAVENLY offer ?
        </h2>
        <p>
          Learn from industry experts, work on real-world projects, earn valuable certifications, and take your career to the next level—all at your own pace!
        </p>
        <div className='about-certification-section-dev'>
          <div>
            <h3>Dynamic interactive education:</h3>
            <ul>
              <li>Top-tire Educators</li>
              <li>Real-time resolution</li>
              <li>Expert-guided mentoring sessions</li>
            </ul>
          </div>
          <div>
            <h3>Industry Recognized Certification:</h3>
            <ul>
              <li>MAVENLY Training Certificate</li>
              <li>Project Completion Certificate</li>
              <li>Letter of Recommendation</li>
            </ul>
          </div>
          <div>
            <h3>Why MAVENLY :</h3>
            <ul>
              <li>Be Certified Professional</li>
              <li>Personalized Learning</li>
              <li>Community and Collaboration</li>
              <li>Excellence in Education</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="about-values-section">
        <div className='About-page-content-second-dev'>
          <div>
            <h2>Our Value</h2>
            <p>
              Empowerment, collaboration, and lifelong learning-helping you grow, innovate, and succeed with education.
            </p>
          </div>
          <div>
            <h2>Our Vision</h2>
            <p>
              At Mavenly, Our vision is to make education accessible, engaging, and transformative by offering flexible, relevant, and high-quality learning experiences that empower every learner.
            </p>
          </div>
          <div>
            <h2>Our Mission</h2>
            <p>
              Our mission is to inspire learners to unlock their full potential through personalized learning powered by cutting-edge technology.
            </p>
          </div>
          <div>
            <h2>Our Motto</h2>
            <p>
              “Building Skills for Tomorrow’s World.”
            </p>
          </div>
        </div>
        <div className='About-page-image-second-dev'>
          <img src="/cloud computing.jpeg" alt="Cloud Computing" />
        </div>
      </section>
    </div>
  );
}

export default About;
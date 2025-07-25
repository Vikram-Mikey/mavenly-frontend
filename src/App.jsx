import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Home';
import SignupPopup from './SignupPopup';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Programs from './Programs';
import Navbar from './Navbar';
import RefundCancellationPolicy from './RefundCancellation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import AddCart from './Addcart'; 
import FreelancingUIDesigning from './pages/FreelancingUIDesigning';
import FreelancingDigitalMarketing from './pages/FreelancingDigitalMarketing';
import FreelancingFinanceProgram from './pages/FreelancingFinanceProgram';
import FreelancingFullStackDevelopment from './pages/FreelancingFullStackDevelopment';
import Cybersecurity from './pages/Cybersecurity';
import DataAnalytics from './pages/DataAnalytics';
import DigitalMarketing from './pages/DigitalMarketing';
import FinanceProgram from './pages/FinanceProgram';
import FullStackDevelopment from './pages/FullStackDevelopment';
import UIDesigning from './pages/UIDesigning';
import AI from './pages/AI';
import CloudComputing from './pages/CloudComputing';
import AppDevelopment from './pages/AppDevelopment';
import EmbeddedSystem from './pages/EmbeddedSystem';
import AutoCAD from './pages/AutoCAD';
import HumanResourceManagement from './pages/HumanResourceManagement';
import MedicalCoding from './pages/MedicalCoding';
import Psychology from './pages/Psychology';
import ArtificialIntelligence from './pages/ArtificialIntelligence';
import HumanResource from './pages/HumanResource';
import Python from './pages/Python';
import Java from './pages/Java';
import C from './pages/C';
import Cpp from './pages/Cpp';
import PowerBI from './pages/PowerBI';
import Excel from './pages/Excel';
import ScrollToTop from './ScrollToTop';
import ForgotPassword from './ForgotPassword';
import Checkout from './Checkout';
import Profile from './Profile';
import Placement from './pages/Placement';
import Testimonials from './pages/Testimonials';
import NotFound from './pages/NotFound';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [showSignup, setShowSignup] = useState(false);
  useEffect(() => {
    // Only show popup if not logged in
    const userId = getCookie('user_id');
    if (!userId) setShowSignup(true);
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <SignupPopup open={showSignup} onClose={() => setShowSignup(false)} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/data-analytics" element={<DataAnalytics />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/finance-program" element={<FinanceProgram />} />
        <Route path="/full-stack-development" element={<FullStackDevelopment />} />
        <Route path="/ui-designing" element={<UIDesigning />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/cloud-computing" element={<CloudComputing />} />
        <Route path="/app-development" element={<AppDevelopment />} />
        <Route path="/embedded-system" element={<EmbeddedSystem />} />
        <Route path="/auto-cad" element={<AutoCAD />} />
        <Route path="/human-resource-management" element={<HumanResourceManagement />} />
        <Route path="/medical-coding" element={<MedicalCoding />} />
        <Route path="/psychology" element={<Psychology />} />
        <Route path="/artificial-intelligence" element={<ArtificialIntelligence />} />
        <Route path="/human-resource" element={<HumanResource />} />
        <Route path="/Python" element={<Python />} />
        <Route path="/Java" element={<Java />} />
        <Route path="/C"  element={<C />} />
        <Route path="/Cpp" element={<Cpp />} />
        <Route path="/PowerBI"  element={<PowerBI />} />
        <Route path="/Excel" element={<Excel />} />
        <Route path="/freelancing/Digital-Marketing" element={<FreelancingDigitalMarketing />} />
        <Route path="/freelancing/Finance-Program" element={<FreelancingFinanceProgram />} />
        <Route path="/freelancing/UI-Designing" element={<FreelancingUIDesigning />} />
        <Route path="/freelancing/Full-Stack-Development" element={<FreelancingFullStackDevelopment />} />
        <Route path="/addcart" element={<AddCart />} />
        <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/testimonial" element={<Testimonials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}

export default App;

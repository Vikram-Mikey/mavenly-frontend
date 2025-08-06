import { useState, useEffect } from 'react';
import useProfilePhoto from './hooks/useProfilePhoto';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './styles/navbar.css';
import Cookies from 'js-cookie';

// Use js-cookie for better cookie management
function getCookie(name) {
  // Use document.cookie for sessionid, since js-cookie cannot read HTTPOnly cookies
  if (name === 'sessionid') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return undefined;
  }
  return Cookies.get(name);
}

function Navbar() {
  const { photoUrl } = useProfilePhoto();
  const [showPrograms, setShowPrograms] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null); // 'tech', 'business', etc.
  const [activeList, setActiveList] = useState({});
  const [programsActive, setProgramsActive] = useState(false);
  const [cartHasItems, setCartHasItems] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const typePrograms = {
  Technology: [
    { label: 'Artificial Intelligence', onClick: () => navigate('/ai') },
    { label: 'Cloud Computing', onClick: () => navigate('/cloud-computing') },
    { label: 'Cybersecurity', onClick: () => navigate('/cybersecurity') },
    { label: 'Data Analytics', onClick: () => navigate('/data-analytics') },
    { label: 'App Development', onClick: () => navigate('/app-development') },
    { label: 'Embedded System', onClick: () => navigate('/embedded-system') },
    { label: 'Full Stack Development', onClick: () => navigate('/full-stack-development') },
  ],
  'Programming Language': [
    { label: 'Python', onClick: () => navigate('/python') },
    { label: 'Java', onClick: () => navigate('/java') },
    { label: 'C', onClick: () => navigate('/c') },
    { label: 'C++', onClick: () => navigate('/cpp') },
    { label: 'Power BI', onClick: () => navigate('/powerbi') },
    { label: 'Excel', onClick: () => navigate('/excel') },
  ],
  Business: [
    { label: 'Finance Program', onClick: () => navigate('/finance-program') },
    { label: 'Human Resource', onClick: () => navigate('/human-resource-management') },
    { label: 'Digital Marketing', onClick: () => navigate('/digital-marketing') },
  ],
  Medical: [
    { label: 'Medical Coding', onClick: () => navigate('/medical-coding') },
    { label: 'Psychology', onClick: () => navigate('/psychology') },
  ],
  Design: [
    { label: 'UI/UX Design', onClick: () => navigate('/ui-designing') },
  ],
  Mechanics: [
    { label: 'Auto CAD', onClick: () => navigate('/auto-cad') },
  ],
  Freelancing: [
    { label: 'Digital Marketing', onClick: () => navigate('/freelancing/Digital-Marketing') },
    { label: 'Finance Program', onClick: () => navigate('/freelancing/Finance-Program') },
    { label: 'UI/UX Design', onClick: () => navigate('/freelancing/UI-Designing') },
    { label: 'Full Stack Development', onClick: () => navigate('/freelancing/Full-Stack-Development') },
  ]
};

  useEffect(() => {
    // Check login state via backend API
    const checkLoginState = async () => {
      try {
        const res = await fetch('/api/profile/', { credentials: 'include' });
        if (!res.ok) {
          console.warn('Profile API error:', res.status);
          setIsLoggedIn(false);
          setCartHasItems(false);
          setAuthLoading(false);
          return;
        }
        const data = await res.json();
        if (data && data.email) {
          setIsLoggedIn(true);
          let cart = JSON.parse(localStorage.getItem(`cart_${data.id || data.email}`) || '[]');
          setCartHasItems(Array.isArray(cart) && cart.length > 0);
        } else {
          setIsLoggedIn(false);
          setCartHasItems(false);
        }
      } catch (err) {
        console.error('Profile API fetch failed:', err);
        setIsLoggedIn(false);
        setCartHasItems(false);
      }
      setAuthLoading(false);
    };
    checkLoginState();
    // Listen for authChanged event to refresh login state instantly after login
    const handleAuthChanged = () => {
      setAuthLoading(true);
      checkLoginState();
    };
    window.addEventListener('authChanged', handleAuthChanged);
    // Listen for cart changes in other tabs/windows and in this tab
    const handleStorage = async () => {
      try {
        const res = await fetch('/api/profile/', { credentials: 'include' });
        if (!res.ok) {
          setCartHasItems(false);
          return;
        }
        const data = await res.json();
        if (data && data.email) {
          let updatedCart = JSON.parse(localStorage.getItem(`cart_${data.id || data.email}`) || '[]');
          setCartHasItems(Array.isArray(updatedCart) && updatedCart.length > 0);
        } else {
          setCartHasItems(false);
        }
      } catch {
        setCartHasItems(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    // Listen for cart changes in this tab
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      origSetItem.apply(this, arguments);
      if (key.startsWith('cart_')) handleStorage();
    };
    // Listen for resize to detect mobile/desktop
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    // Check login state on mount and when cookies change
    // No need to poll cookies, rely on API
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('authChanged', handleAuthChanged);
      localStorage.setItem = origSetItem;
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove('user_id', { path: '/' });
    Cookies.remove('user_email', { path: '/' });
    setIsLoggedIn(false);
    // Optionally redirect to home or login page
    navigate('/');
  };

  // Show dropdown when mouse enters, hide when leaves
  const handleProgramsMouseEnter = () => setShowPrograms(true);
  const handleProgramsMouseLeave = () => setShowPrograms(false);

  // Sidebar menu links for mobile
  const sidebarLinks = (
    <div className="navbar-sidebar-links">
      {isLoggedIn && (
        <div
          style={{display:'flex',alignItems:'center',gap:10,marginBottom:18,marginLeft:4,cursor:'pointer'}}
          onClick={() => { setSidebarOpen(false); navigate('/profile'); }}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              style={{width:44,height:44,borderRadius:'50%',objectFit:'cover',border:'2px solid #2563eb'}}
            />
          ) : (
            <span
              style={{width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,borderRadius:'50%',background:'#e0e7ef',border:'2px solid #2563eb'}}
              role="img"
              aria-label="profile"
            >👤</span>
          )}
          <span style={{fontWeight:600,color:'#2563eb'}}>Profile</span>
        </div>
      )}
      <span
        className="navbar-sidebar-link"
        onClick={() => { setSidebarOpen(false); navigate('/'); }}
      >Home</span>
      <span
        className="navbar-sidebar-link"
        onClick={() => setProgramsActive(!programsActive)}
      >
        Programs
        <span className="navbar-sidebar-category-arrow">
          {programsActive ? '▲' : '▼'}
        </span>
      </span>
      {programsActive && (
        <div className="navbar-sidebar-programs">
          { [
  'Technology',
  'Programming Language',
  'Business',
  'Medical',
  'Design',
  'Mechanics',
  'Freelancing'
].map(category => (
            <div key={category}>
              <span
                className="navbar-sidebar-category"
                onClick={() =>
                  setActiveList(prev => ({
                    ...prev,
                    [category]: !prev[category]
                  }))
                }
              >
                {category}
                <span className="navbar-sidebar-category-arrow">
                  {activeList[category] ? '▲' : '▼'}
                </span>
              </span>
              {activeList[category] && (
                <div className="navbar-sidebar-program-list">
                  {(typePrograms[category] || []).map(program => (
                    <span
                      key={program.label}
                      className="navbar-sidebar-program-item"
                      onClick={() => {
                        program.onClick();
                        setSidebarOpen(false);
                        setProgramsActive(false);
                        setActiveList({});
                      }}
                    >
                      {program.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <span className="navbar-sidebar-link" onClick={() => { setSidebarOpen(false); navigate('/about'); }}>About</span>
      <span className="navbar-sidebar-link" onClick={() => { setSidebarOpen(false); navigate('/contact'); }}>Contact</span>
      {!isLoggedIn && (
        <span className="navbar-sidebar-link" onClick={() => { setSidebarOpen(false); navigate('/login'); }}>
          Login/Signup
        </span>
      )}
    </div>
  );
  // Sidebar overlay for mobile
  const sidebar = (
    <div className={`navbar-sidebar${sidebarOpen ? ' open' : ' closed'}`}> 
      <span className="navbar-sidebar-close" onClick={() => setSidebarOpen(false)}>&times;</span>
      {sidebarLinks}
    </div>
  );
  const sidebarBackdrop = (
    <div className="navbar-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
  );

  if (authLoading) {
    return <nav className="navbar"><div className="navbar-loading">Loading...</div></nav>;
  }
  if (isMobile) {
    return (
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <img src="/mavenly logo.png" alt="Mavenly Logo" className="nav-logo-img" />
          <span className="navbar-mobile-menu-btn" onClick={() => setSidebarOpen(true)}>&#9776;</span>
        </div>
        {sidebarOpen && sidebarBackdrop}
        {sidebar}
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          {isLoggedIn && cartHasItems && (
            <img
              src="/Addcart.jpg"
              alt="Add to Cart"
              className="navbar-cart-img"
              onClick={() => navigate('/addcart')}
            />
          )}
          {isLoggedIn && photoUrl && (
            <img
              src={photoUrl}
              alt="Profile"
              className="navbar-profile-img"
              style={{width:36,height:36,borderRadius:'50%',objectFit:'cover',border:'2px solid #2563eb',cursor:'pointer'}}
              onClick={() => navigate('/profile')}
            />
          )}
        </div>
      </nav>
    );
  }

  if (authLoading) {
    return <nav className="navbar"><div className="navbar-loading">Loading...</div></nav>;
  }
  return (
    <nav className="navbar">
      <img src="/mavenly logo.png" alt="Mavenly Logo" className="nav-logo-img" />
      <div className="nav-links">
        <Link
          to="/"
          className="navbar-link"
          onClick={e => location.pathname === '/' && e.preventDefault()}
        >
          Home
        </Link>
        <div className="navbar-programs-dropdown">
          <span
            className={`navbar-programs-btn${programsActive ? ' active' : ''}`}
            onClick={() => setProgramsActive(!programsActive)}
          >
            Programs
            <span style={{ marginLeft: 8 }}>{programsActive ? '▲' : '▼'}</span>
          </span>
          {programsActive && (
            <ul
              className="navbar-programs-menu"
              onMouseLeave={() => {
                setProgramsActive(false);
                setActiveList({});
              }}
            >
              {Object.entries(typePrograms).map(([category, subprograms]) => (
                <li key={category}>
                  <span
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                    onClick={e => {
                      e.stopPropagation();
                      setActiveList({ [category]: !activeList[category] });
                    }}
                  >
                    {category}
                    <span style={{ marginLeft: 8, fontSize: 14 }}>
                      {activeList[category] ? '▲' : '▼'}
                    </span>
                  </span>
                  {activeList[category] && (
                    <ul className="navbar-programs-submenu">
                      {subprograms.map(sub => (
                        <li key={sub.label} onClick={() => {
                          sub.onClick();
                          setProgramsActive(false);
                          setActiveList({});
                        }}>{sub.label}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/about" className="navbar-link" onClick={e => location.pathname === '/about' && e.preventDefault() }>About</Link>
        <Link className="navbar-link" to="/contact" onClick={e => location.pathname === '/contact' && e.preventDefault()} >Contact</Link>
        {/* Placement button removed */}
        {isLoggedIn && (
          photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="navbar-profile-img"
              style={{width:36,height:36,borderRadius:'50%',objectFit:'cover',border:'2px solid #2563eb',cursor:'pointer',marginLeft:'1.2rem'}} 
              onClick={() => navigate('/profile')}
            />
          ) : (
            <span
              className="navbar-profile-icon"
              style={{width:36,height:36,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:22,borderRadius:'50%',background:'#e0e7ef',border:'2px solid #2563eb',cursor:'pointer',marginLeft:'1.2rem'}}
              onClick={() => navigate('/profile')}
              role="img"
              aria-label="profile"
            >👤</span>
          )
        )}
        {!isLoggedIn && (
          <Link to="/login" className="navbar-link" onClick={e => location.pathname === '/login' && e.preventDefault()} >Login/Signup</Link>
        )}
        {isLoggedIn && cartHasItems && (
          <img
            src="/Addcart.jpg"
            alt="Add to Cart"
            style={{ width: 30, height: 30, marginLeft: '1.5rem', cursor: 'pointer', verticalAlign: 'middle' }}
            onClick={() => navigate('/addcart')}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config.js';
import { useNavigate } from 'react-router-dom';
import './styles/checkout.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}



function Checkout() {
  // All hooks must be at the top, before any early returns
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [amounts, setAmounts] = useState({ original: 0, discount: 0, total: 0 });
  const [activeOption, setActiveOption] = useState(null); // 'qr' or 'upi'
  const [qrVisible, setQrVisible] = useState(false);
  const [qrTimer, setQrTimer] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [customUpi, setCustomUpi] = useState('');
  const [showCustomUpi, setShowCustomUpi] = useState(false);
  const navigate = useNavigate();
  // Fetch UPI and QR info from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/payment-info/`)
      .then(res => res.json())
      .then(data => {
        setUpiId(data.upi_number || '');
        setQrCodeUrl(data.qr_image_url || '');
      })
      .catch(() => {
        setUpiId('');
        setQrCodeUrl('');
      });
  }, []);

  useEffect(() => {
    const userId = getCookie('user_id');
    let cart = [];
    if (userId) {
      cart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
    }
    if (!cart || cart.length === 0) {
      setCartEmpty(true);
      setTimeout(() => navigate('/addcart'), 1000);
      return;
    }
    // Calculate and set amounts for display
    const getPlanPrice = plan => {
      if (plan === 'Basic Plan') return 4999;
      if (plan === 'Pro Plan') return 9999;
      if (plan === 'Premium Plan' || plan === 'Primum Plan') return 14999;
      return 0;
    };
    let original = 0;
    cart.forEach(item => {
      original += getPlanPrice(item.plan);
    });
    let total = 0;
    const totalStr = localStorage.getItem(`cart_total_${userId}`);
    if (totalStr) {
      total = parseFloat(totalStr);
    } else {
      let sum = original;
      try {
        const ref = JSON.parse(localStorage.getItem('applied_referral'));
        if (ref && ref.discount) {
          sum = sum - Math.round(sum * ref.discount);
        }
      } catch {}
      total = sum;
    }
    let discount = 0;
    if (original > total) {
      discount = original - total;
    }
    setAmounts({ original, discount, total });
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userId = getCookie('user_id');
      let cart = [];
      if (userId) {
        cart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
      }
      // Attach plan amount to each cart item
      const getPlanPrice = plan => {
        if (plan === 'Basic Plan') return 4999;
        if (plan === 'Pro Plan') return 9999;
        if (plan === 'Premium Plan' || plan === 'Primum Plan') return 14999;
        return 0;
      };
      const cartWithAmount = cart.map(item => ({ ...item, plan_amount: getPlanPrice(item.plan) }));

      // Calculate original and discount amounts
      let original_amount = 0;
      cart.forEach(item => {
        original_amount += getPlanPrice(item.plan);
      });
      let discount_amount = 0;
      if (amounts && amounts.original > amounts.total) {
        discount_amount = amounts.original - amounts.total;
      }

      // Send checkout info to backend to email host
      await fetch(`${API_BASE_URL}/api/checkout-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          address: form.address,
          phone: form.phone,
          cart: cartWithAmount,
          total: amounts.total,
          original_amount: amounts.original,
          discount_amount: discount_amount
        }),
      });

      // Send confirmation email to user (now with total, original_amount, discount_amount, and plan_amount)
      await fetch(`${API_BASE_URL}/api/payment-confirmation-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          cart: cartWithAmount,
          total: amounts.total,
          original_amount: amounts.original,
          discount_amount: discount_amount
        }),
      });
      setSubmitted(true);
    } catch (err) {
      alert('Network error.');
    }
  };

  if (cartEmpty) {
    return (
      <section className="checkout-section">
        <div className="checkout-container">
          <h2>No items in cart</h2>
          <p>Redirecting to cart...</p>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="checkout-section">
        <div className="checkout-container">
          <h2>Thank you!</h2>
          <p>Your information has been received. We will contact you soon.</p>
        </div>
      </section>
    );
  }

  // Copy UPI ID to clipboard
  const handleCopyUPI = () => {
    if (upiId) {
      navigator.clipboard.writeText(upiId);
      alert('UPI ID copied!');
    }
  };



  // Handle click for payment options
  const handleOptionClick = (option) => {
    setActiveOption(option);
    setShowCustomUpi(false);
    if (option === 'qr') {
      setQrVisible(true);
      if (qrTimer) clearTimeout(qrTimer);
      const timer = setTimeout(() => {
        setQrVisible(false);
        setActiveOption(null);
      }, 2 * 60 * 1000); // 2 minutes
      setQrTimer(timer);
    } else {
      setQrVisible(false);
      if (qrTimer) clearTimeout(qrTimer);
    }
  };

  // UPI deep link generator
  const upiDeepLink = (app, upi) => {
    const payee = encodeURIComponent(upi || upiId);
    const amount = amounts.total || 1;
    const name = encodeURIComponent(form.name || 'Mavenly');
    const url = `upi://pay?pa=${payee}&pn=${name}&am=${amount}&cu=INR`;
    if (app === 'gpay') return `https://pay.google.com/gp/p/ui/pay?uri=${encodeURIComponent(url)}`;
    if (app === 'phonepe') return `phonepe://pay?pa=${payee}&pn=${name}&am=${amount}&cu=INR`;
    if (app === 'paytm') return `paytmmp://pay?pa=${payee}&pn=${name}&am=${amount}&cu=INR`;
    if (app === 'bhim') return `bhim://upi/pay?pa=${payee}&pn=${name}&am=${amount}&cu=INR`;
    // fallback: open UPI intent
    return url;
  };

  const handleUpiAppClick = (app) => {
    window.location.href = upiDeepLink(app);
  };

  const handleCustomUpiPay = () => {
    if (!customUpi) return;
    window.location.href = upiDeepLink('custom', customUpi);
  };

  return (
    <section className="checkout-section">
      <div className="checkout-bg">
        <div className="checkout-container checkout-flex">
          {/* Left: Checkout Form */}
          <div className="checkout-left">
            <h1>Checkout</h1>
            <div className="checkout-amount-summary">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Original Amount:</span>
                <span>₹{amounts.original}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Discount:</span>
                <span style={{ color: '#2e7d32' }}>- ₹{amounts.discount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1em' }}>
                <span>Total:</span>
                <span>₹{amounts.total}</span>
              </div>
            </div>
            {submitted ? (
              <div className="checkout-form" style={{ textAlign: 'center', padding: '32px 0' }}>
                <h2>Thank you!</h2>
                <p>Your information has been received. We will contact you soon.</p>
              </div>
            ) : (
              <form className="checkout-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Proceed to Payment</button>
              </form>
            )}
          </div>
          {/* Right: Payment Options */}
          <div className="checkout-right">
            <h2>Payment Options</h2>
            <div className="pay-option-list">
              <div
                className={`pay-option-row${activeOption === 'qr' ? ' active' : ''}`}
                onClick={() => handleOptionClick('qr')}
                tabIndex={0}
                role="button"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '14px 12px', borderRadius: 8, background: activeOption === 'qr' ? '#e3eaff' : '#fff', marginBottom: 10, border: '1.5px solid #2563eb22', fontWeight: 500 }}
              >
                <span>Pay by QR Code</span>
                <span style={{ fontSize: 22, color: '#2563eb', marginLeft: 8 }}>&#8594;</span>
              </div>
              <div
                className={`pay-option-row${activeOption === 'upi' ? ' active' : ''}`}
                onClick={() => handleOptionClick('upi')}
                tabIndex={0}
                role="button"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '14px 12px', borderRadius: 8, background: activeOption === 'upi' ? '#e3eaff' : '#fff', border: '1.5px solid #2563eb22', fontWeight: 500 }}
              >
                <span>Pay by UPI ID</span>
                <span style={{ fontSize: 22, color: '#2563eb', marginLeft: 8 }}>&#8594;</span>
              </div>
            </div>
            {/* QR Code Section */}
            {activeOption === 'qr' && qrVisible && qrCodeUrl && (
              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <img src={qrCodeUrl} alt="Scan QR to Pay" style={{ width: 180, height: 180, marginBottom: 12 }} />
                <div style={{ fontSize: 15, color: '#374151', marginBottom: 6 }}>Scan this QR code with your UPI app<br/><span style={{ color: '#ef4444', fontSize: 13 }}>(QR will disappear after 2 minutes)</span></div>
              </div>
            )}
            {/* UPI Section */}
            {activeOption === 'upi' && upiId && (
              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Pay to UPI ID:</div>
                <div className="upi-id">{upiId}</div>
                <button type="button" onClick={handleCopyUPI}>Copy UPI ID</button>
                <div className="upi-hint">Use your UPI app or select an app below:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', margin: '18px 0 10px 0' }}>
                  <button type="button" style={{ background: '#4285f4', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }} onClick={() => handleUpiAppClick('gpay')}>GPay</button>
                  <button type="button" style={{ background: '#673ab7', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }} onClick={() => handleUpiAppClick('phonepe')}>PhonePe</button>
                  <button type="button" style={{ background: '#00baf2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }} onClick={() => handleUpiAppClick('paytm')}>Paytm</button>
                </div>
                <div style={{ marginTop: 18, color: '#ef4444', fontSize: 14, fontWeight: 500 }}>
                  If the app does not open, please try on your mobile device or scan the QR code.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;

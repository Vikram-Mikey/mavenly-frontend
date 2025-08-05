import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/addcart.css';




// 20 referral codes, names, and discount (flat 10% for demo)
const REFERRALS = [
  { code: 'MAV25A', name: 'Hari Narayanan', discount: 0.1 },
  { code: 'MAV25B', name: 'Bhoomika', discount: 0.1 },
  { code: 'MAV25C', name: 'kamalesh', discount: 0.1 },
  { code: 'MAV25D', name: 'Amuthan', discount: 0.1 },
  { code: 'MAV25E', name: 'Adarsh', discount: 0.1 },
  { code: 'MAV25F', name: 'Bhoomesh', discount: 0.1 },
  { code: 'MAV25G', name: 'Sindhu', discount: 0.1 },
  { code: 'MAV25H', name: 'Sneha', discount: 0.1 },
  { code: 'MAV25I', name: 'Anu', discount: 0.1 },
  { code: 'MAV25J', name: 'Dhanalakshmi', discount: 0.1 },
  { code: 'MAV25K', name: 'Bhoomika', discount: 0.1 },
  { code: 'MAV25L', name: 'Ragul', discount: 0.1 },
  { code: 'MAV25M', name: 'Subhashri', discount: 0.1 },
  { code: 'MAV25N', name: 'Vandhana', discount: 0.1 },
  { code: 'MAV25O', name: 'Darshni', discount: 0.1 },
  { code: 'MAV25P', name: 'Pavish', discount: 0.1 },
  { code: 'MAV25Q', name: 'Dharunika', discount: 0.1 },
];

function AddCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReferral, setShowReferral] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralApplied, setReferralApplied] = useState(false);
  const [referralError, setReferralError] = useState('');
  const sessionId = getCookie('sessionid');
  console.log('[AddCart] sessionId:', sessionId);
  const [appliedReferral, setAppliedReferral] = useState(() => {
    // On mount, try to load referral from localStorage per session
    try {
      if (!sessionId) return null;
      const ref = JSON.parse(localStorage.getItem(`applied_referral_${sessionId}`));
      console.log('[AddCart] Loaded appliedReferral from localStorage:', ref);
      return ref || null;
    } catch (e) {
      console.error('[AddCart] Error loading appliedReferral:', e);
      return null;
    }
  });
  const navigate = useNavigate();
  const isLoggedIn = !!sessionId;
  console.log('[AddCart] isLoggedIn:', isLoggedIn);

  // Helper to get price by plan
  const getPlanPrice = (plan) => {
    if (plan === 'Basic Plan') return 4999;
    if (plan === 'Pro Plan' ) return 9999;
    if (plan === 'Premium Plan' || plan === 'Primum Plan') return 14999;
    return 0;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      console.warn('[AddCart] Not logged in, navigating to /login');
      navigate('/login');
      return;
    }
    const cartData = JSON.parse(localStorage.getItem(`cart_${sessionId}`) || '[]');
    console.log('[AddCart] Loaded cartData:', cartData);
    setCart(cartData);
    // Calculate total
    let sum = 0;
    cartData.forEach(item => {
      sum += getPlanPrice(item.plan);
    });
    // If referral applied, apply discount
    if (appliedReferral) {
      sum = sum - Math.round(sum * appliedReferral.discount);
    }
    setTotal(sum);
  }, [isLoggedIn, navigate, sessionId, appliedReferral]);

  const removeFromCart = idxToRemove => {
    const updatedCart = cart.filter((_, idx) => idx !== idxToRemove);
    setCart(updatedCart);
    localStorage.setItem(`cart_${sessionId}` , JSON.stringify(updatedCart));
    // Recalculate total
    let sum = 0;
    updatedCart.forEach(item => {
      sum += getPlanPrice(item.plan);
    });
    if (appliedReferral) {
      sum = sum - Math.round(sum * appliedReferral.discount);
    }
    setTotal(sum);
  };

  return (
    <section className="addcart-section">
      <div className="addcart-dev-left">
        <div className="addcart-dev-left-header">
          <div className="addcart-dev-left-header-title">Product</div>
          <div className="addcart-dev-left-header-title">Total</div>
        </div>
        <hr className="addcart-dev-left-hr" />
        {cart && cart.length > 0 ? (
          cart.map((item, idx) => (
            <div key={idx} className="addcart-item">
              <div className="addcart-item-img-btn">
                <img src={item.img} alt={item.program} className="addcart-item-img" />
                <button
                  className="addcart-item-remove-btn"
                  onClick={() => removeFromCart(idx)}
                >
                  Remove
                </button>
              </div>
              <div className="addcart-item-details">
                <div className="addcart-item-title">{item.program}</div>
                <div className="addcart-item-plan">{item.plan}</div>
              </div>
              <div className="addcart-item-price">₹{getPlanPrice(item.plan).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div className="addcart-empty">No items in cart.</div>
        )}
      </div>
      <div className="addcart-dev-right">
        <h2 className="addcart-dev-right-title">Cart Totals</h2>
        <div className="addcart-dev-right-total-programs">Total Programs: {cart.length}</div>
        {/* Referral code UI */}
        <div className="addcart-referral-row">
          <div
            className={"addcart-referral-label-row" + (showReferral ? ' open' : '')}
            onClick={() => setShowReferral(v => !v)}
          >
            <span className="addcart-referral-label">Apply a referral code</span>
            <span className="addcart-referral-arrow">▼</span>
          </div>
          {showReferral && (
            <div className="addcart-referral-input-row">
              <input
                type="text"
                className="addcart-referral-input"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={e => setReferralCode(e.target.value)}
                disabled={referralApplied}
              />
              <button
                className="addcart-referral-apply-btn"
                onClick={e => {
                  e.preventDefault();
                  setReferralError('');
                  if (!referralCode.trim()) {
                    setReferralError('Please enter a code.');
                    return;
                  }
                  const found = REFERRALS.find(r => r.code.toLowerCase() === referralCode.trim().toLowerCase());
                  if (!found) {
                    setReferralError('Invalid referral code.');
                    setAppliedReferral(null);
                    setReferralApplied(false);
                    localStorage.removeItem(`applied_referral_${sessionId}`);
                    return;
                  }
                  setReferralApplied(true);
                  setAppliedReferral(found);
                  // Save to localStorage for checkout page, per session
                  localStorage.setItem(`applied_referral_${sessionId}`, JSON.stringify(found));
                }}
                disabled={referralApplied}
              >
                {referralApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
          )}
          {referralError && <div className="addcart-referral-error">{referralError}</div>}
        </div>
        {appliedReferral && (
          <div className="addcart-referral-success">
            Referral by <b>{appliedReferral.name}</b> applied! Discount: {Math.round(appliedReferral.discount * 100)}%
            {/* Optionally, add a remove button */}
            <button
              className="addcart-referral-remove-btn"
              style={{ marginLeft: 12, fontSize: 12, padding: '2px 8px', cursor: 'pointer' }}
              onClick={() => {
                setAppliedReferral(null);
                setReferralApplied(false);
                setReferralCode('');
                localStorage.removeItem(`applied_referral_${sessionId}`);
              }}
            >Remove</button>
          </div>
        )}
        <div className="addcart-dev-right-total">Total: ₹{total.toLocaleString()}</div>
        <button
          className="addcart-checkout-btn"
          onMouseDown={e => e.currentTarget.style.background = '#ff5757'}
          onMouseUp={e => e.currentTarget.style.background = '#4998da'}
          onMouseLeave={e => e.currentTarget.style.background = '#4998da'}
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      </div>
    </section>
  );
}

export default AddCart;
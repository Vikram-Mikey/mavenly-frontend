import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/addcart.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


// 20 referral codes, names, and discount (flat 10% for demo)
const REFERRALS = [
  { code: 'REF20A', name: 'Aarav', discount: 0.1 },
  { code: 'REF20B', name: 'Vihaan', discount: 0.1 },
  { code: 'REF20C', name: 'Vivaan', discount: 0.1 },
  { code: 'REF20D', name: 'Ananya', discount: 0.1 },
  { code: 'REF20E', name: 'Ishaan', discount: 0.1 },
  { code: 'REF20F', name: 'Advik', discount: 0.1 },
  { code: 'REF20G', name: 'Aadhya', discount: 0.1 },
  { code: 'REF20H', name: 'Myra', discount: 0.1 },
  { code: 'REF20I', name: 'Reyansh', discount: 0.1 },
  { code: 'REF20J', name: 'Aarohi', discount: 0.1 },
  { code: 'REF20K', name: 'Advika', discount: 0.1 },
  { code: 'REF20L', name: 'Aanya', discount: 0.1 },
  { code: 'REF20M', name: 'Ira', discount: 0.1 },
  { code: 'REF20N', name: 'Kabir', discount: 0.1 },
  { code: 'REF20O', name: 'Dhruv', discount: 0.1 },
  { code: 'REF20P', name: 'Aarush', discount: 0.1 },
  { code: 'REF20Q', name: 'Saanvi', discount: 0.1 },
  { code: 'REF20R', name: 'Pari', discount: 0.1 },
  { code: 'REF20S', name: 'Riya', discount: 0.1 },
  { code: 'REF20T', name: 'Arjun', discount: 0.1 },
];

function AddCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReferral, setShowReferral] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralApplied, setReferralApplied] = useState(false);
  const [referralError, setReferralError] = useState('');
  const userId = getCookie('user_id');
  const [appliedReferral, setAppliedReferral] = useState(() => {
    // On mount, try to load referral from localStorage per user
    try {
      if (!userId) return null;
      const ref = JSON.parse(localStorage.getItem(`applied_referral_${userId}`));
      return ref || null;
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();
  const isLoggedIn = !!userId;

  // Helper to get price by plan
  const getPlanPrice = (plan) => {
    if (plan === 'Basic Plan') return 4999;
    if (plan === 'Pro Plan' ) return 9999;
    if (plan === 'Premium Plan' || plan === 'Primum Plan') return 14999;
    return 0;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const cartData = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
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
  }, [isLoggedIn, navigate, userId, appliedReferral]);

  const removeFromCart = idxToRemove => {
    const updatedCart = cart.filter((_, idx) => idx !== idxToRemove);
    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}` , JSON.stringify(updatedCart));
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
                    localStorage.removeItem(`applied_referral_${userId}`);
                    return;
                  }
                  setReferralApplied(true);
                  setAppliedReferral(found);
                  // Save to localStorage for checkout page, per user
                  localStorage.setItem(`applied_referral_${userId}`, JSON.stringify(found));
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
                localStorage.removeItem(`applied_referral_${userId}`);
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
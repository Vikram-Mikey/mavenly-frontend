import { useNavigate } from 'react-router-dom';

function WhatsAppButton() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 2000 }}>
      <img
        src="/WhatsApp.svg.png"
        alt="WhatsApp Chat"
        style={{ width: 60, height: 60, cursor: 'pointer', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
        onClick={() => window.open('https://wa.me/916380806142', '_blank')}
      />
    </div>
  );
}
export default WhatsAppButton;
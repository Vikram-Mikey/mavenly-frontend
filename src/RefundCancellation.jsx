import { useNavigate } from 'react-router-dom';
import './styles/refundcancellation.css';


function RefundCancellationPolicy() {
  const navigate = useNavigate();
  return (
    <section className="refund-cancellation-section">
      <div className="refund-title-dev">
        <h2>Refund/Cancellation Policy</h2>
      </div>
      <div className="refund-content-dev">
        We are committed to ensuring your satisfaction with any product, service, course, or workshop you have purchased from us. Please read the following terms carefully as they govern our refund policy.<br /><br />
        <strong>Workshops:</strong><br />
        No refunds or credits will be granted against payments related to workshops.<br /><br />
        <strong>Courses:</strong><br />
        We do not offer refunds for courses. Please carefully consider your schedule and commitment before enrolling.<br />
        You may transfer your enrollment to a subsequent cohort. A nominal administrative fee will apply for such transfers.
      </div>
    </section>
  );
}


export default  RefundCancellationPolicy;
import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function DigitalMarketing() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page digital-marketing">
      <ProgramDevSection className="digital-marketing-dev-section" imgSrc="/Digital Marketing.jpg" imgAlt="Digital Marketing" />
    </section>
  );
}

export default DigitalMarketing;

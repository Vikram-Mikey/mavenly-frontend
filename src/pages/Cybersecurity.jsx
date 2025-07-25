import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function Cybersecurity() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page cybersecurity">
      <ProgramDevSection className="cybersecurity-dev-section" imgSrc="/Cybersecurity.jpg" imgAlt="Cybersecurity" />
    </section>
  );
}

export default Cybersecurity;

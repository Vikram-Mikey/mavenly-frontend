import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function EmbeddedSystem() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page embedded-system">
      <ProgramDevSection className="embedded-system-dev-section" imgSrc="/embedded system.jpeg" imgAlt="Embedded System" />
    </section>
  );
}

export default EmbeddedSystem;

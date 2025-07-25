import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function Java() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page Java">
      <ProgramDevSection className="Java-dev-section" imgSrc="/java.png" imgAlt="Java" />
    </section>
  );
}

export default Java;

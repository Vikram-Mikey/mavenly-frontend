import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function ArtificialIntelligence() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page ai">
      <ProgramDevSection className="ai-dev-section" imgSrc="/ai.jpg" imgAlt="Artificial Intelligence" />
    </section>
  );
}

export default ArtificialIntelligence;

import { useLocation, useNavigate } from 'react-router-dom';

import ProgramDevSection from '../ProgramDevSection';

function AI() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page ai">
      <ProgramDevSection className="ai-dev-section" imgSrc="/ai.jpg" imgAlt="AI" />
    </section>
  );
}

export default AI;

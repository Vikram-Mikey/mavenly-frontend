import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function FullStackDevelopment() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page full-stack-development">
      <ProgramDevSection className="full-stack-development-dev-section" imgSrc="/Full Stack Development.jpg" imgAlt="Full Stack Development" />
    </section>
  );
}

export default FullStackDevelopment;

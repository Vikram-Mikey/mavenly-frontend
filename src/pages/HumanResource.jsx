import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function HumanResource() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page human-resource">
      <ProgramDevSection className="human-resource-dev-section" imgSrc="/mhr.webp" imgAlt="Human Resource" />
    </section>
  );
}

export default HumanResource;

import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function CloudComputing() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page cloud-computing">
      <ProgramDevSection className="cloud-computing-dev-section" imgSrc="/cloud computing.jpeg" imgAlt="Cloud Computing" />
    </section>
  );
}

export default CloudComputing;

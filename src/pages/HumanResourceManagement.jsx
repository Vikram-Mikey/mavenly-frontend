import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function HumanResourceManagement() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page human-resource-management">
      <ProgramDevSection className="human-resource-management-dev-section" imgSrc="/mhr.webp" imgAlt="Human Resource Management" />
    </section>
  );
}

export default HumanResourceManagement;

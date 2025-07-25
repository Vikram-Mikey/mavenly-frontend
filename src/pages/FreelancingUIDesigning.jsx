import { useLocation, useNavigate } from 'react-router-dom';
import FreelancingProgramDevSection from '../FreelancingProgramdevsection';

function FreelancingUIDesigning() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page freelancing-UI-Designing">
      <FreelancingProgramDevSection className="freelancingUIDesigning-dev-section" imgSrc="/UI Designing.jpg" imgAlt="freelancingUIDesigning" />
    </section>
  );
}

export default FreelancingUIDesigning;

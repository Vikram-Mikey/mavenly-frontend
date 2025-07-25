import { useLocation, useNavigate } from 'react-router-dom';
import FreelancingProgramDevSection from '../FreelancingProgramdevsection';

function FreelancingFullStackDevelopment() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page freelancing-Full-Stack-Development">
      <FreelancingProgramDevSection className="freelancingFullStackDevelopment-dev-section" imgSrc="/Full Stack Development.jpg" imgAlt="freelancingFullStackDevelopment" />
    </section>
  );
}

export default FreelancingFullStackDevelopment;

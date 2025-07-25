import { useLocation, useNavigate } from 'react-router-dom';
import FreelancingProgramDevSection from '../FreelancingProgramdevsection';

function FreelancingDigitalMarketing() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page freelancing-Digital-Marketing">
      <FreelancingProgramDevSection className="freelancingDigitalMarketing-dev-section" imgSrc="/Digital Marketing.jpg" imgAlt="freelancingDigitalMarketing" />
    </section>
  );
}

export default FreelancingDigitalMarketing;

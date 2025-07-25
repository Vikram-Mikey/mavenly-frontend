import { useLocation, useNavigate } from 'react-router-dom';
import FreelancingProgramDevSection from '../FreelancingProgramdevsection';

function FreelancingFinanceProgram() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page freelancing-Finance-Program">
      <FreelancingProgramDevSection className="freelancingFinanceProgram-dev-section" imgSrc="/Finance Program.jpg" imgAlt="freelancingFinanceProgram" />
    </section>
  );
}

export default FreelancingFinanceProgram;

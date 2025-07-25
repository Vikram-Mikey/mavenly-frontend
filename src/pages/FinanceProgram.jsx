import { useLocation, useNavigate } from 'react-router-dom';

import ProgramDevSection from '../ProgramDevSection';

function FinanceProgram() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page finance-program">
      <ProgramDevSection className="finance-program-dev-section" imgSrc="/Finance Program.jpg" imgAlt="Finance Program" />
    </section>
  );
}

export default FinanceProgram;

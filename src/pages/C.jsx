import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function C() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page C">
      <ProgramDevSection className="C-dev-section" imgSrc="/c.png" imgAlt="C" />
    </section>
  );
}

export default C;

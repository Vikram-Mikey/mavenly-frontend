import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function Python() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page Python">
      <ProgramDevSection className="Python-dev-section" imgSrc="/python.png" imgAlt="Python" />
    </section>
  );
}

export default Python;

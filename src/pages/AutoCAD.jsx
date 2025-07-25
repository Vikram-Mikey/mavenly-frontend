import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function AutoCAD() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page auto-cad">
      <ProgramDevSection className="auto-cad-dev-section" imgSrc="/AutoCAD.webp" imgAlt="Auto Cad" />
    </section>
  );
}

export default AutoCAD;

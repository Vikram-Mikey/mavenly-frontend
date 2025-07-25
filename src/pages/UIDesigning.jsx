import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function UIDesigning() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page ui-designing">
      <ProgramDevSection className="ui-designing-dev-section" imgSrc="/UI Designing.jpg" imgAlt="UI/UX Designing" />
    </section>
  );
}

export default UIDesigning;

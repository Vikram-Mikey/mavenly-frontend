import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function Excel() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page Excel">
      <ProgramDevSection className="Excel-dev-section" imgSrc="/excel.png" imgAlt="Excel" />
    </section>
  );
}

export default Excel;

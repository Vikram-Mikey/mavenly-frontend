import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function DataAnalytics() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page data-analytics">
      <ProgramDevSection className="data-analytics-dev-section" imgSrc="/Data Analytics.jpg" imgAlt="Data Analytics" />
    </section>
  );
}

export default DataAnalytics;

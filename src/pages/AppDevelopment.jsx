import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function AppDevelopment() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page app-development">
      <ProgramDevSection className="app-development-dev-section" imgSrc="/app development.webp" imgAlt="App Development" />
    </section>
  );
}

export default AppDevelopment;

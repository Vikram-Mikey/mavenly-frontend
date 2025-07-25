import { useLocation, useNavigate } from 'react-router-dom';

import ProgramDevSection from '../ProgramDevSection';

function Psychology() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page psychology">
      <ProgramDevSection className="psychology-dev-section" imgSrc="/psychology.jpeg" imgAlt="Psychology" />
    </section>
  );
}

export default Psychology;

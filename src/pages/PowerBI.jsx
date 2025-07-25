import { useLocation, useNavigate } from 'react-router-dom';

import ProgramDevSection from '../ProgramDevSection';

function PowerBI() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page PowerBI">
      <ProgramDevSection className="PowerBI-dev-section" imgSrc="/powerbi.png" imgAlt="PowerBI" />
    </section>
  );
}

export default PowerBI;

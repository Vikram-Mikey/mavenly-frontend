import { useLocation, useNavigate } from 'react-router-dom';

import ProgramDevSection from '../ProgramDevSection';

function Cpp() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page Cpp">
      <ProgramDevSection className="Cpp-dev-section" imgSrc="/cpp.png" imgAlt="cpp" />
    </section>
  );
}

export default Cpp;

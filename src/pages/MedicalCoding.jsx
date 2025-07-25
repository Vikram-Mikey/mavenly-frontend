import { useLocation, useNavigate } from 'react-router-dom';
import ProgramDevSection from '../ProgramDevSection';

function MedicalCoding() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page medical-coding">
      <ProgramDevSection className="medical-coding-dev-section" imgSrc="/medical coding.jpeg" imgAlt="Medical Coding" />
    </section>
  );
}

export default MedicalCoding;

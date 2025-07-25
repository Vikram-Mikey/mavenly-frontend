import { useNavigate } from 'react-router-dom';
import './styles/programs-custom.css';

function Programs() {
  const navigate = useNavigate();
  // All programs to display, each with name, image, and navigation route
  const allPrograms = [
    { name: 'Full Stack Development', img: '/Full Stack Development.jpg', route: '/full-stack-development', rating: 5 },
    { name: 'Data Analytics', img: '/Data Analytics.jpg', route: '/data-analytics', rating: 4.5 },
    { name: 'Cybersecurity', img: '/Cybersecurity.jpg', route: '/cybersecurity', rating: 4.7 },
    { name: 'Digital Marketing', img: '/Digital Marketing.jpg', route: '/digital-marketing', rating: 4.8 },
    { name: 'Finance Program', img: '/Finance Program.jpg', route: '/finance-program', rating: 4.6 },
    { name: 'UI/UX Designing', img: '/UI Designing.jpg', route: '/ui-designing', rating: 4.9 },
    { name: 'Artificial Intelligence', img: '/ai.jpg', route: '/ai', rating: 4.7 },
    { name: 'Cloud Computing', img: '/cloud computing.jpeg', route: '/cloud-computing', rating: 4.7 },
    { name: 'App Development', img: '/app development.webp', route: '/app-development', rating: 4.8 },
    { name: 'Embedded System', img: '/embedded system.jpeg', route: '/embedded-system', rating: 4.7 },
    { name: 'Auto Cad', img: '/AutoCAD.webp', route: '/auto-cad', rating: 4.7 },
    { name: 'Human Resource Management', img: '/mhr.webp', route: '/human-resource-management', rating: 4.7 },
    { name: 'Medical Coding', img: '/medical coding.jpeg', route: '/medical-coding', rating: 4.7 },
    { name: 'Psychology', img: '/psychology.jpeg', route: '/psychology', rating: 4.7 },
    { name: 'Python', img: '/python.png', route: '/Python', rating: 4.7 },
    { name: 'Java', img: '/java.png', route: '/Java', rating: 4.7 },
    { name: 'C', img: '/c.png', route: '/C', rating: 4.7 },
    { name: 'Cpp', img: '/cpp.png', route: '/Cpp', rating: 4.7 },
    { name: 'PowerBI', img: '/powerbi.png', route: '/PowerBI', rating: 4.7 },
    { name: 'Excel', img: '/excel.png', route: '/Excel', rating: 4.7 }
  ];
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{color:'#ffb400', fontSize:'1.3rem'}}>★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" style={{color:'#ffb400', fontSize:'1.3rem'}}>☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={stars.length+100} style={{color:'#bbb', fontSize:'1.3rem'}}>★</span>);
    }
    return stars;
  };
  // Group programs into rows of 3
  const rows = [];
  for (let i = 0; i < allPrograms.length; i += 3) {
    rows.push(allPrograms.slice(i, i + 3));
  }
  return (
    <section className="page programs">
      <div className="programs-container programs-container-custom">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="programs-row">
            {row.map((program) => (
              <div
                className="program-card program-card-custom"
                key={program.name}
                onClick={() => navigate(program.route)}
              >
                {program.img && (
                  <img src={program.img} alt={program.name} className="program-img program-img-custom" />
                )}
                <div className="program-rating program-rating-custom">{renderStars(program.rating)}</div>
                {program.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Programs;
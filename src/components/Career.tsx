import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Self-taught Developer</h4>
                <h5>Learning Journey</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Started learning web development from scratch. Mastered HTML, CSS,
              and JavaScript fundamentals through self-study and online resources.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer</h4>
                <h5>Freelance Projects</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built multiple responsive websites and web applications using
              React.js and modern CSS. Delivered projects for clients with
              clean UI/UX and pixel-perfect designs.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer</h4>
                <h5>Open to Opportunities</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Expanding skills with Next.js, TypeScript, and Tailwind CSS.
              Building personal projects and contributing to open-source.
              Actively looking for exciting frontend roles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

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
              <h3>2025</h3>
            </div>
            <p>
              Started learning web and mobile development from scratch. Picked up
              HTML, CSS, JavaScript, React.js, and Flutter through self-study
              and building real projects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Building Projects</h4>
                <h5>Learning by Doing</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Actively building web and mobile apps using React.js, Next.js,
              TypeScript, and Flutter. Learning new technologies every day and
              turning ideas into real-world projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

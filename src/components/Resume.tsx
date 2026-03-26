import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiDownload, FiShare2 } from "react-icons/fi";
import gsap from "gsap";
import "./styles/Resume.css";

const Resume = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mouse cursor animation
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const loop = () => {
      cursorPos.x += (mousePos.x - cursorPos.x) / 6;
      cursorPos.y += (mousePos.y - cursorPos.y) / 6;
      cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Hide portfolio scroll behind overlay
  useEffect(() => {
    document.body.classList.add("resume-open");
    return () => {
      document.body.classList.remove("resume-open");
    };
  }, []);

  // Scroll-reveal animations
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const sections = page.querySelectorAll(".resume-animate");
    const revealed = new Set<number>();

    sections.forEach((s) => gsap.set(s, { opacity: 0, y: 30 }));

    const reveal = () => {
      const threshold = page.scrollTop + page.clientHeight - 30;
      sections.forEach((section, i) => {
        if (revealed.has(i)) return;
        if ((section as HTMLElement).offsetTop < threshold) {
          revealed.add(i);
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: revealed.size <= 5 ? i * 0.08 : 0,
          });
        }
      });
    };

    page.addEventListener("scroll", reveal);
    requestAnimationFrame(reveal);

    return () => page.removeEventListener("scroll", reveal);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MD Zamal — Resume",
          text: "Check out MD Zamal's resume",
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(url);
      const btn = document.querySelector(".share-btn") as HTMLElement;
      if (btn) {
        btn.setAttribute("data-tooltip", "Copied!");
        setTimeout(() => btn.removeAttribute("data-tooltip"), 2000);
      }
    }
  };

  return (
    <div className="resume-page" ref={pageRef}>
      <div className="resume-cursor" ref={cursorRef} />
      <div className="resume-actions no-print resume-animate">
        <button className="action-btn back-btn" onClick={() => navigate("/")}>
          <IoArrowBack />
          <span>Back</span>
        </button>
        <div className="action-group">
          <button className="action-btn download-btn" onClick={handleDownload}>
            <FiDownload />
            <span>Download</span>
          </button>
          <button className="action-btn share-btn" onClick={handleShare}>
            <FiShare2 />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="resume-container">
        <header className="resume-header resume-animate">
          <h1 className="resume-name">MD ZAMAL</h1>
          <p className="resume-title">Frontend Developer</p>
        </header>

        <div className="resume-divider resume-animate" />

        <section className="resume-section resume-animate">
          <h2 className="section-heading">Contact</h2>
          <div className="contact-grid">
            <a href="mailto:zamal4426@gmail.com" className="contact-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">zamal4426@gmail.com</span>
            </a>
            <a
              href="https://github.com/zamal4426"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/zamal4426</span>
            </a>
            <a
              href="https://linkedin.com/in/md-zamaluddin"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">linkedin.com/in/md-zamaluddin</span>
            </a>
            <a
              href="https://wa.me/8801921277460"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <span className="contact-label">WhatsApp</span>
              <span className="contact-value">+8801921277460</span>
            </a>
          </div>
        </section>

        <div className="resume-divider resume-animate" />

        <section className="resume-section resume-animate">
          <h2 className="section-heading">About</h2>
          <p className="about-text">
            I build polished, high-performance web and mobile experiences with
            React.js, Next.js, TypeScript, and Flutter. From AI-powered platforms
            to wellness apps, every project I ship is crafted with sharp attention
            to detail and a drive to solve real problems. Self-taught, constantly
            shipping, and always raising the bar.
          </p>
        </section>

        <div className="resume-divider resume-animate" />

        <section className="resume-section resume-animate">
          <h2 className="section-heading">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <span className="skill-label">Frontend</span>
              <span className="skill-tags">
                React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5,
                CSS3, GSAP
              </span>
            </div>
            <div className="skill-category">
              <span className="skill-label">Mobile</span>
              <span className="skill-tags">Flutter, Dart</span>
            </div>
            <div className="skill-category">
              <span className="skill-label">Backend</span>
              <span className="skill-tags">Node.js, Express.js</span>
            </div>
            <div className="skill-category">
              <span className="skill-label">Database</span>
              <span className="skill-tags">
                PostgreSQL, MongoDB, MySQL, SQLite, Firebase
              </span>
            </div>
            <div className="skill-category">
              <span className="skill-label">Tools</span>
              <span className="skill-tags">
                Git & GitHub, VS Code, Figma, Vercel, REST APIs
              </span>
            </div>
          </div>
        </section>

        <div className="resume-divider resume-animate" />

        <section className="resume-section resume-animate">
          <h2 className="section-heading">Projects</h2>
          <div className="projects-list">
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">01</span>
                <span className="project-name">Resufy</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">AI-Powered Job Search Platform</span>
              </div>
              <p className="project-tech">
                Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Claude AI,
                Stripe
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">02</span>
                <span className="project-name">Kortex</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">
                  AI Agent Orchestration Platform
                </span>
              </div>
              <p className="project-tech">
                Node.js, React, TypeScript, Tailwind CSS, WebSocket, SQLite
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">03</span>
                <span className="project-name">LifeControl</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">
                  AI Personal Life Assistant
                </span>
              </div>
              <p className="project-tech">
                Flutter, Dart, Firebase, Google Sign-In, Provider, FL Chart
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">04</span>
                <span className="project-name">StreakUp</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">Habit Tracking App</span>
              </div>
              <p className="project-tech">
                Flutter, Dart, Firebase, Material Design 3
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">05</span>
                <span className="project-name">MoodMate</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">AI Mood Companion App</span>
              </div>
              <p className="project-tech">
                Flutter, Dart, Firebase, Speech-to-Text, FL Chart
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">06</span>
                <span className="project-name">MoodMoon</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">Wellness & Meditation Companion</span>
              </div>
              <p className="project-tech">
                Flutter, Dart, Firebase, Just Audio, TTS, In-App Purchase
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">07</span>
                <span className="project-name">SocialMedia Guild</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">Community Management App</span>
              </div>
              <p className="project-tech">
                Flutter, Dart, Firebase Realtime Database, Google Sign-In
              </p>
            </div>
            <div className="project-item">
              <div className="project-header">
                <span className="project-number">08</span>
                <span className="project-name">Reflecto</span>
                <span className="project-dash">&mdash;</span>
                <span className="project-desc">Self-Care & Reflection App</span>
              </div>
              <p className="project-tech">Flutter, Dart, SharedPreferences</p>
            </div>
          </div>
        </section>

        <div className="resume-divider resume-animate" />

        <section className="resume-section resume-animate">
          <h2 className="section-heading">Education</h2>
          <div className="education-item">
            <span className="education-title">Madrasa Education</span>
            <span className="education-separator">|</span>
            <span className="education-detail">
              Self-taught Developer (2025 &ndash; Present)
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;

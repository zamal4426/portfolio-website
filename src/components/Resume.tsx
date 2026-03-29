import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import "./styles/Resume.css";

const Resume = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("resume-open");
    return () => {
      document.body.classList.remove("resume-open");
    };
  }, []);

  // Cursor — same lerp as main page (only RAF running on this page)
  useEffect(() => {
    const cursor = glowRef.current;
    if (!cursor) return;

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const loop = () => {
      pos.x += (mouse.x - pos.x) / 6;
      pos.y += (mouse.y - pos.y) / 6;
      cursor.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-reveal animations (IntersectionObserver — zero lag)
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const sections = page.querySelectorAll(".resume-animate");
    let count = 0;

    sections.forEach((s) => gsap.set(s, { opacity: 0, y: 24 }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          count++;
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: count <= 4 ? count * 0.06 : 0,
          });
        });
      },
      { root: page, threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
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
    <>
    <div className="resume-glow no-print" ref={glowRef} />
    <div className="resume-page" ref={pageRef}>

      {/* Top bar */}
      <header className="resume-topbar no-print resume-animate">
        <button className="resume-back" onClick={() => navigate("/")}>
          <IoArrowBack /> Back
        </button>
        <div className="resume-topbar-actions">
          <button className="resume-action-btn" onClick={handleDownload}>
            <FiDownload />
          </button>
          <button
            className="resume-action-btn share-btn"
            onClick={handleShare}
          >
            <FiShare2 />
          </button>
        </div>
      </header>

      <div className="resume-paper">
        {/* Header */}
        <div className="resume-header resume-animate">
          <div className="resume-header-left">
            <h1 className="resume-name">
              MD<span>ZAMAL</span>
            </h1>
            <p className="resume-role">Frontend Developer</p>
          </div>
          <div className="resume-header-right">
            <a href="mailto:zamal4426@gmail.com">zamal4426@gmail.com</a>
            <a
              href="https://github.com/zamal4426"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/zamal4426 <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/md-zamaluddin"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/md-zamaluddin <MdArrowOutward />
            </a>
            <a
              href="https://wa.me/8801921277460"
              target="_blank"
              rel="noopener noreferrer"
            >
              +880 1921 277460
            </a>
          </div>
        </div>

        <div className="resume-divider" />

        {/* Summary */}
        <section className="resume-sect resume-animate">
          <h2 className="resume-sect-title">Summary</h2>
          <p className="resume-summary">
            I build polished, high-performance web and mobile experiences with
            React.js, Next.js, TypeScript, and Flutter. From AI-powered
            platforms to wellness apps, every project I ship is crafted with
            sharp attention to detail and a drive to solve real problems.
            Self-taught, constantly shipping, and always raising the bar.
          </p>
        </section>

        <div className="resume-divider" />

        {/* Skills */}
        <section className="resume-sect resume-animate">
          <h2 className="resume-sect-title">Technical Skills</h2>
          <div className="resume-skill-grid">
            <div className="resume-skill-group">
              <h3>Frontend</h3>
              <p>React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3, GSAP</p>
            </div>
            <div className="resume-skill-group">
              <h3>Mobile</h3>
              <p>Flutter, Dart</p>
            </div>
            <div className="resume-skill-group">
              <h3>Backend</h3>
              <p>Node.js, Express.js</p>
            </div>
            <div className="resume-skill-group">
              <h3>Database</h3>
              <p>PostgreSQL, MongoDB, MySQL, SQLite, Firebase</p>
            </div>
            <div className="resume-skill-group">
              <h3>Tools</h3>
              <p>Git & GitHub, VS Code, Figma, Vercel, REST APIs</p>
            </div>
          </div>
        </section>

        <div className="resume-divider" />

        {/* Projects */}
        <section className="resume-sect resume-animate">
          <h2 className="resume-sect-title">Projects</h2>
          <div className="resume-project-list">
            {[
              {
                name: "Resufy",
                desc: "AI-Powered Job Search Platform",
                tech: "Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Claude AI, Stripe",
              },
              {
                name: "Kortex",
                desc: "AI Agent Orchestration Platform",
                tech: "Node.js, React, TypeScript, Tailwind CSS, WebSocket, SQLite",
              },
              {
                name: "LifeControl",
                desc: "AI Personal Life Assistant",
                tech: "Flutter, Dart, Firebase, Google Sign-In, Provider, FL Chart",
              },
              {
                name: "StreakUp",
                desc: "Habit Tracking App",
                tech: "Flutter, Dart, Firebase, Material Design 3",
              },
              {
                name: "MoodMate",
                desc: "AI Mood Companion App",
                tech: "Flutter, Dart, Firebase, Speech-to-Text, FL Chart",
              },
              {
                name: "MoodMoon",
                desc: "Wellness & Meditation Companion",
                tech: "Flutter, Dart, Firebase, Just Audio, TTS, In-App Purchase",
              },
              {
                name: "SocialMedia Guild",
                desc: "Community Management App",
                tech: "Flutter, Dart, Firebase Realtime Database, Google Sign-In",
              },
              {
                name: "Reflecto",
                desc: "Self-Care & Reflection App",
                tech: "Flutter, Dart, SharedPreferences",
              },
            ].map((p, i) => (
              <div className="resume-project-card" key={i}>
                <div className="resume-project-top">
                  <h4>{p.name}</h4>
                  <span className="resume-project-badge">{p.desc}</span>
                </div>
                <p className="resume-project-stack">{p.tech}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="resume-divider" />

        {/* Education */}
        <section className="resume-sect resume-animate">
          <h2 className="resume-sect-title">Education</h2>
          <div className="resume-edu-item">
            <div className="resume-edu-info">
              <h4>Madrasa Education</h4>
              <p>Self-taught Developer</p>
            </div>
            <span className="resume-edu-date">2025 &ndash; Present</span>
          </div>
        </section>

        {/* Footer accent */}
        <div className="resume-paper-footer resume-animate">
          <div className="resume-footer-line" />
          <p>
            Designed & Developed by <span>Md Zamal</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Resume;

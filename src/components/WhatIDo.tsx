import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const handlers: Array<[HTMLDivElement, () => void]> = [];
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          container.addEventListener("click", handler);
          handlers.push([container, handler]);
        }
      });
    }
    return () => {
      handlers.forEach(([el, fn]) => el.removeEventListener("click", fn));
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>MOBILE APP</h3>
              <h4>Building Beautiful Mobile Apps</h4>
              <p>
                Crafting polished, high-performance mobile applications with Flutter.
                From wellness apps to AI-powered companions, I deliver smooth native experiences.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Flutter</div>
                <div className="what-tags">Dart</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">Android Studio</div>
                <div className="what-tags">Provider</div>
                <div className="what-tags">Riverpod</div>
                <div className="what-tags">Material Design 3</div>
                <div className="what-tags">REST APIs</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>TOOLS & MORE</h3>
              <h4>Development Workflow</h4>
              <p>
                Using modern tools and workflows to build and deploy projects
                efficiently. From version control to deployment, I keep it smooth.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Git & GitHub</div>
                <div className="what-tags">VS Code</div>
                <div className="what-tags">Android Studio</div>
                <div className="what-tags">Firebase Console</div>
                <div className="what-tags">Figma</div>
                <div className="what-tags">Google Play Console</div>
                <div className="what-tags">SQLite</div>
                <div className="what-tags">Hive</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

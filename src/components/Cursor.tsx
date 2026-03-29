import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    let paused = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const loop = () => {
      if (paused) return;
      if (!hover) {
        cursorPos.x += (mousePos.x - cursorPos.x) / 6;
        cursorPos.y += (mousePos.y - cursorPos.y) / 6;
        cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const overHandlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];
    const outHandlers: Array<[HTMLElement, () => void]> = [];

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const onOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          cursorPos.x = rect.left;
          cursorPos.y = rect.top;
          cursor.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
      overHandlers.push([element, onOver]);
      outHandlers.push([element, onOut]);
    });

    // Pause/resume when navigating to/from resume
    const bodyObserver = new MutationObserver(() => {
      const resumeOpen = document.body.classList.contains("resume-open");
      if (resumeOpen && !paused) {
        paused = true;
        cancelAnimationFrame(rafId);
      } else if (!resumeOpen && paused) {
        paused = false;
        rafId = requestAnimationFrame(loop);
      }
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      bodyObserver.disconnect();
      overHandlers.forEach(([el, fn]) => el.removeEventListener("mouseover", fn));
      outHandlers.forEach(([el, fn]) => el.removeEventListener("mouseout", fn));
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;

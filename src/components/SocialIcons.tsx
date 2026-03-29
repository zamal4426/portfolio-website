import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    const icons: Array<{
      rect: DOMRect;
      link: HTMLElement;
      mouseX: number;
      mouseY: number;
      currentX: number;
      currentY: number;
    }> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;
      const rect = elem.getBoundingClientRect();
      icons.push({
        rect,
        link,
        mouseX: rect.width / 2,
        mouseY: rect.height / 2,
        currentX: 0,
        currentY: 0,
      });
    });

    const onMouseMove = (e: MouseEvent) => {
      icons.forEach((icon) => {
        const x = e.clientX - icon.rect.left;
        const y = e.clientY - icon.rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          icon.mouseX = x;
          icon.mouseY = y;
        } else {
          icon.mouseX = icon.rect.width / 2;
          icon.mouseY = icon.rect.height / 2;
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const updatePositions = () => {
      icons.forEach((icon) => {
        icon.currentX += (icon.mouseX - icon.currentX) * 0.1;
        icon.currentY += (icon.mouseY - icon.currentY) * 0.1;
        icon.link.style.setProperty("--siLeft", `${icon.currentX}px`);
        icon.link.style.setProperty("--siTop", `${icon.currentY}px`);
      });
      rafId = requestAnimationFrame(updatePositions);
    };
    rafId = requestAnimationFrame(updatePositions);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <span>
          <a href="https://github.com/zamal4426" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://linkedin.com/in/md-zamaluddin" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://wa.me/8801921277460" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/peacely_1/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </span>
      </div>
      <Link className="resume-button" to="/resume">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </Link>
    </div>
  );
};

export default SocialIcons;

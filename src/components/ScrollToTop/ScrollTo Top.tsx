import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop(): ReactElement {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Автоматичний скролл при зміні маршруту
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "50px",
        right: "50px",
        padding: "12px 14px",
        backgroundColor: "var(--background)",
        color: "var(--main-accent)",
        // border: isHovered ? "1px solid  rgba(38, 38, 38, 0.15)" : "none",
        borderRadius: "50%",
        boxShadow: !isHovered
          ? "0 6px 12px rgba(0, 0, 0, 0.2)"
          : "0 0 8px rgba(255, 255, 255, 0.555), 0 0 8px rgba(200, 200, 200, 0.233)",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition:
          "opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
      }}
    >
      <ArrowUp
        size={24}
        style={{
          color: isHovered ? "var(--main-text)" : "none",
        }}
      />
    </button>
  );
}

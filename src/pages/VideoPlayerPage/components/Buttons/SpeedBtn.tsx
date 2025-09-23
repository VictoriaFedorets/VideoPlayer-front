import { RefObject, useState, useRef, useEffect } from "react";
import Speed from "icons/Speed";
import css from "./Buttons.module.css";

interface SpeedDropdownProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

const speeds = [0.5, 1, 1.5, 2];

export default function SpeedDropdown({ videoRef }: SpeedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSpeedSelect = (speed: number) => {
    setCurrentSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    document.addEventListener("closeDropdowns", handleClose);
    return () => document.removeEventListener("closeDropdowns", handleClose);
  }, []);

  return (
    <div className={css.speedDropdown} ref={dropdownRef}>
      <button className={css.btn} onClick={toggleDropdown}>
        <Speed className={css.icons} />
      </button>

      {isOpen && (
        <div className={css.dropdownMenu}>
          {speeds.map((speed) => (
            <div
              key={speed}
              className={`${css.dropdownItem} ${
                currentSpeed === speed ? css.active : ""
              }`}
              onClick={() => handleSpeedSelect(speed)}
            >
              {speed}x
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

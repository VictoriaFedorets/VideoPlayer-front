import { RefObject, useState, useRef } from "react";
import css from "./Timeline.module.css";

interface TimelineProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  currentTime: number;
  duration: number;
  setCurrentTime: (time: number) => void;
}

export default function Timeline({
  videoRef,
  currentTime,
  duration,
  setCurrentTime,
}: TimelineProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Перемотка
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!videoRef.current || !progressRef.current) return;

    const videoElement = videoRef.current;
    const progressBarElement = progressRef.current;

    const widthProgress = progressBarElement.getBoundingClientRect();
    const positionClickX = e.clientX - widthProgress.left;
    const newTime = (positionClickX / widthProgress.width) * duration;

    videoElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // натискання кнопки миші на прогрес-барі
  const handleMouseDown = () => setIsDragging(true);

  // відпускання кнопки миші
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    handleClick(e);
  };

  // рух миші по прогрес-бару
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleClick(e);
  };

  return (
    <div
      className={css.progressBar}
      ref={progressRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className={css.progress} style={{ width: `${progress}%` }}></div>

      <div className={css.cursor} style={{ left: `${progress}%` }}></div>
      <span className={css.currentTime}>
        {formatTime(currentTime)}/{formatTime(duration)}
      </span>
    </div>
  );
}

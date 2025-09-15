import { useEffect, useRef, useState } from "react";
import Controls from "@components/Controls/Controls";
import css from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  name: string;
  src: string;
}

export default function VideoPlayer({ name, src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // тривалість записуємо в стейт
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(e.target as Node)
      ) {
        document.dispatchEvent(new Event("closeDropdowns"));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.videoConteiner}>
      <h2>{name}</h2>
      <video
        autoPlay
        className={css.video}
        ref={videoRef}
        src={src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div ref={controlsRef}>
        <Controls
          videoRef={videoRef}
          currentTime={currentTime}
          duration={duration}
          setCurrentTime={setCurrentTime}
        />
      </div>
    </div>
  );
}

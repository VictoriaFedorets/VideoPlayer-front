import { RefObject, useEffect, useState } from "react";
import css from "./Timeline.module.css";

export default function Timeline({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement>;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      setLength(videoElement.duration);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  // const handleCursorClick (e) => {
  //    const currentClick = e.currentTarget;
  // }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  const progress = (currentTime / length) * 100;
  //   console.log(progress);

  return (
    <>
      <div className={css.progressBar}>
        <div style={{ width: `${progress}%` }} className={css.progress}></div>
        <span className={css.currentTime}>
          {formatTime(currentTime)}/{formatTime(length)}
        </span>
      </div>
    </>
  );
}

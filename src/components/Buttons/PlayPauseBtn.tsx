import { RefObject, useState } from "react";
import css from "@components/Buttons/Buttons.module.css";

export default function PlayPauseBtn({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlaying = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className={`${css.btn} ${isPlaying ? css.active : ""}`}
      onClick={togglePlaying}
    >
      <img
        className={css.icons}
        src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
        alt="play"
      />
    </button>
  );
}

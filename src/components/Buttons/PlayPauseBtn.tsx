import { RefObject, useState } from "react";
import Play from "icons/Play";
import Pause from "icons/Pause";
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
      {isPlaying ? (
        <Pause className={css.icons} />
      ) : (
        <Play className={css.icons} />
      )}
    </button>
  );
}

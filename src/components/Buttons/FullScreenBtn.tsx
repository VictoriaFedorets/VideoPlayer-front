import { RefObject } from "react";
import css from "@components/Buttons/Buttons.module.css";

export default function FullScreenBtn({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const handleFullScreenClick = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
      return;
    }
  };

  return (
    <button className={css.btn} onClick={handleFullScreenClick}>
      {" "}
      <img
        className={css.icons}
        src="/public/icons/fullScreen.svg"
        alt="fullscreen"
      />
    </button>
  );
}

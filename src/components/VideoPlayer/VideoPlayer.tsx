import { useRef } from "react";
import css from "./VideoPlayer.module.css";
import Controls from "@components/Controls/Controls";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={css.videoConteiner}>
      <h1>Video player</h1>
      <video
        className={css.video}
        ref={videoRef}
        src="/video/videoplayback.mp4"
      />

      <Controls videoRef={videoRef} />
    </div>
  );
}

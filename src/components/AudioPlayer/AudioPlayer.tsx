import { useRef, useState } from "react";
import css from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const playerRef = useRef<HTMLVideoElement>(null);
  //   console.log(playerRef);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlaying = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <h1>Audio player</h1>
      <video ref={playerRef} src="/public/audio/umideep_-_sad_breath.mp3" />
      <button onClick={togglePlaying}>{isPlaying ? "Pause" : "Play"}</button>
    </>
  );
}

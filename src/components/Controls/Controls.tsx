import FullScreenBtn from "@components/Buttons/FullScreenBtn";
import PlayPauseBtn from "@components/Buttons/PlayPauseBtn";
import VolumeControlBtn from "@components/Buttons/VolumeControlBtn";
import Timeline from "@components/Timeline/Timeline";
import { RefObject } from "react";
import css from "./Controls.module.css";

interface ControlsProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function Controls({ videoRef }: ControlsProps) {
  return (
    <>
      <Timeline videoRef={videoRef} />
      <div className={css.btnWrapper}>
        <div className={css.btnFirstBlock}>
          <PlayPauseBtn videoRef={videoRef} />
          <VolumeControlBtn videoRef={videoRef} />
        </div>
        <FullScreenBtn videoRef={videoRef} />
      </div>
    </>
  );
}

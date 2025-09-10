import { RefObject, useEffect, useState } from "react";
import css from "@components/Buttons/Buttons.module.css";
import VolumeOff from "icons/VolumeOff";
import VolumeOn from "icons/VolumeOn";

export default function VolumeControlBtn({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const [volume, setVolume] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  const toggleOnOff = () => {
    if (!videoRef.current) return;

    if (volume > 0) {
      videoRef.current.volume = 0;
      setVolume(0);
    } else {
      videoRef.current.volume = 1;
      setVolume(100);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(Number(e.target.value));
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    const handleClose = () => setIsVisible(false);
    document.addEventListener("closeDropdowns", handleClose);
    return () => document.removeEventListener("closeDropdowns", handleClose);
  }, []);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        className={css.btn}
        onClick={() => {
          toggleOnOff();
          toggleVisible();
        }}
      >
        {volume > 0 ? (
          <VolumeOn className={css.icons} />
        ) : (
          <VolumeOff className={css.icons} />
        )}
      </button>

      {isVisible && (
        <>
          <input
            className={css.inputVolume}
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={volumeChange}
            style={{ "--value": `${volume}%` } as React.CSSProperties}
          />
          <span>{volume}%</span>
        </>
      )}
    </>
  );
}

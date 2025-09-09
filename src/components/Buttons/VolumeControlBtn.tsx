import { RefObject, useState } from "react";
import css from "@components/Buttons/Buttons.module.css";
import VolumeOff from "../../../public/icons/VolumeOff";
import VolumeOn from "../../../public/icons/VolumeOn";
export default function VolumeControlBtn({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const [volume, setVolume] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  // muted метод чтоб звук на выходе видео должен быть отключен,возможно заменю

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
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={volumeChange}
          />
          <span>{volume}%</span>
        </>
      )}
    </>
  );
}

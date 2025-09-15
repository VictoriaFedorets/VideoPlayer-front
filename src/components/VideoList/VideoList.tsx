import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { loadVideosFromLS } from "redux/videos/videosOperations";
import { selectVideos } from "redux/videos/videosSelectors";
import css from "./VideoList.module.css";
import { VideoData } from "redux/videos/videosSlice";
import { useNavigate } from "react-router-dom";

export default function VideoList() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(selectVideos);
  const navigate = useNavigate();

  const getYouTubeThumbnail = (url: string) => {
    try {
      let videoId = null;

      if (url.includes("youtube.com")) {
        videoId = new URL(url).searchParams.get("v");
      } else if (url.includes("youtu.be")) {
        const path = new URL(url).pathname;
        videoId = path.split("/")[1];
      }

      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null;
    } catch {
      return null;
    }
  };

  const handleClick = (video: VideoData) => {
    if (video.type === "local" || video.url.endsWith(".mp4")) {
      navigate("/videoPlayer", { state: video });
    } else if (
      video.url.includes("youtube.com") ||
      video.url.includes("youtu.be")
    ) {
      window.open(video.url, "_blank");
    } else {
      window.open(video.url, "_blank");
    }
  };

  useEffect(() => {
    dispatch(loadVideosFromLS());
  }, [dispatch]);

  return (
    <>
      {videos.length === 0 ? (
        <p>No videos yet</p>
      ) : (
        <ul className={css.videoList}>
          {videos.map((video) => (
            <li
              key={video.id}
              className={css.videoItem}
              onClick={() => handleClick(video)}
            >
              <h4>{video.name}</h4>

              {video.type === "local" || video.url.endsWith(".mp4") ? (
                <video preload="metadata" poster={video.poster || undefined}>
                  <source src={video.url} type="video/mp4" />
                </video>
              ) : video.url.includes("youtube.com") ||
                video.url.includes("youtu.be") ? (
                <img
                  src={getYouTubeThumbnail(video.url) || undefined}
                  alt="poster video"
                />
              ) : (
                <div className={css.externalVideo}>
                  External video (click to open)
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

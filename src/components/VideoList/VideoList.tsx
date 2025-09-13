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
      const videoId = new URL(url).searchParams.get("v");
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "";
    } catch {
      return "";
    }
  };

  const handleClick = (video: VideoData) => {
    if (video.type === "local") {
      navigate("/videoPlayer", { state: video });
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
              {video.type === "local" ? (
                <video src={video.url} controls width="100%" height="200" />
              ) : video.url.includes("youtube.com") ? (
                <img
                  src={getYouTubeThumbnail(video.url)}
                  alt={video.name}
                  width="100%"
                  height="200"
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

import { AppDispatch } from "redux/store";
import { setVideos, addVideo, VideoData } from "./videosSlice";
import { v4 as uuidv4 } from "uuid";

export const loadVideosFromLS = () => (dispatch: AppDispatch) => {
  const saved = JSON.parse(localStorage.getItem("videoData") || "[]");
  dispatch(setVideos(saved));
};

export const saveVideoToLS =
  (video: { name: string; url: string }) => (dispatch: AppDispatch) => {
    const videoWithId: VideoData = {
      id: uuidv4(),
      ...video,
      type: video.url.startsWith("http") ? "external" : "local",
    };

    const saved = JSON.parse(localStorage.getItem("videoData") || "[]");
    const updated = [...saved, videoWithId];
    localStorage.setItem("videoData", JSON.stringify(updated));

    dispatch(addVideo(videoWithId));
  };

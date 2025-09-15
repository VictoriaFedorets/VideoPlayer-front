import { createAsyncThunk } from "@reduxjs/toolkit";
import { VideoData } from "./videosSlice";
import { v4 as uuidv4 } from "uuid";
import { getVideos, setVideos } from "utils/localStorageHelper";

interface AddVideoPayload {
  name: string;
  url: string;
  poster?: string;
}

// завантажуємо з лок стор
export const loadVideosFromLS = createAsyncThunk(
  "videos/loadVideos",
  async () => {
    const videos = getVideos();
    return videos;
  }
);

export const addVideoToLS = createAsyncThunk<VideoData, AddVideoPayload>(
  "videos/addVideo",
  async (video) => {
    const saved = getVideos();

    const videoWithId: VideoData = {
      id: uuidv4(),
      ...video,
      type: video.url.startsWith("http") ? "external" : "local",
    };
    const updated = [...saved, videoWithId];
    setVideos(updated);

    return videoWithId;
  }
);

export const deleteVideoToLS = createAsyncThunk(
  "videos/deleteVideo",
  async (id: string) => {
    const saved = getVideos();
    const updated = saved.filter((video) => video.id !== id);
    setVideos(updated);
    return id;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { VideoData } from "./videosSlice";
import { v4 as uuidv4 } from "uuid";
import { getVideos, setVideos } from "utils/localStorageHelper";

interface AddVideoPayload {
  name: string;
  url: string;
  poster?: string;
}

export interface UpdateVideoPayload {
  id: string;
  name: string;
  url: string;
  poster?: string;
  type?: "local" | "external";
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

export const updateVideoToLS = createAsyncThunk(
  "videos/updateVideo",
  async (payload: UpdateVideoPayload) => {
    const saved = getVideos();
    // console.log(saved);

    const updated = saved.map((video) =>
      video.id === payload.id
        ? {
            ...video,
            name: payload.name,
            url: payload.url,
            poster: payload.poster,
          }
        : video
    );
    setVideos(updated);

    // const updatedVideo = updated.find((v) => v.id === payload.id);
    // console.log("Updated video only:", updatedVideo);
    // console.log("Updated video:", updated);

    return payload;
  }
);

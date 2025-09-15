import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VideoData {
  id: string;
  name: string;
  url: string;
  poster?: string;
  type: "local" | "external";
}

interface VideosState {
  items: VideoData[];
}

const initialState: VideosState = {
  items: [],
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos(state, action: PayloadAction<VideoData[]>) {
      state.items = action.payload;
    },
    addVideo(state, action: PayloadAction<VideoData>) {
      state.items.push(action.payload);
    },
    // removeVideo(state, action: PayloadAction<number>) {
    //   state.items = state.items.filter((_, i) => i !== action.payload);
    //   localStorage.setItem("videoData", JSON.stringify(state.items));
    // },
  },
});

export const { setVideos, addVideo } = videosSlice.actions;
export default videosSlice.reducer;

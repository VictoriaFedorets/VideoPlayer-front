import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadVideosFromLS,
  addVideoToLS,
  deleteVideoToLS,
} from "./videosOperations";

export interface VideoData {
  id: string;
  name: string;
  url: string;
  poster?: string;
  type: "local" | "external";
}

interface VideosState {
  items: VideoData[];
  status: "idle" | "loading" | "failed";
}

const initialState: VideosState = {
  items: [],
  status: "idle",
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVideosFromLS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadVideosFromLS.fulfilled,
        (state, action: PayloadAction<VideoData[]>) => {
          state.items = action.payload;
          state.status = "idle";
        }
      )
      .addCase(loadVideosFromLS.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(
        addVideoToLS.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.items.push(action.payload);
        }
      )

      .addCase(
        deleteVideoToLS.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (video) => video.id !== action.payload
          );
        }
      );
  },
});

export default videosSlice.reducer;

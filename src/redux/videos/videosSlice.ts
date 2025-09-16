import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadVideosFromLS,
  addVideoToLS,
  deleteVideoToLS,
  updateVideoToLS,
  UpdateVideoPayload,
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
  error: string | null;
  deleteStatus: "idle" | "loading" | "failed";
  updateStatus: "idle" | "loading" | "failed";
}

const initialState: VideosState = {
  items: [],
  status: "idle",
  error: null,
  deleteStatus: "idle",
  updateStatus: "idle",
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

      // add video
      .addCase(
        addVideoToLS.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.items.push(action.payload);
        }
      )

      // delete video
      .addCase(deleteVideoToLS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteVideoToLS.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (video) => video.id !== action.payload
          );
        }
      )
      .addCase(deleteVideoToLS.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Error deleting video";
      })

      // update video
      .addCase(updateVideoToLS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateVideoToLS.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.status = "idle";
          state.items = state.items.map((video) =>
            video.id === action.payload.id ? action.payload : video
          );
        }
      )
      .addCase(updateVideoToLS.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Error updated video";
      });
  },
});

export default videosSlice.reducer;

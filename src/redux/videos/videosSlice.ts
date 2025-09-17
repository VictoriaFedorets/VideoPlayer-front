import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadVideosFromLS,
  addVideoToLS,
  deleteVideoToLS,
  updateVideoToLS,
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
}

const initialState: VideosState = {
  items: [],
  status: "idle",
  error: null,
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVideosFromLS.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loadVideosFromLS.fulfilled,
        (state, action: PayloadAction<VideoData[]>) => {
          state.items = action.payload;
          state.status = "idle";
        }
      )
      .addCase(loadVideosFromLS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to load videos";
      })

      // add video
      .addCase(addVideoToLS.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addVideoToLS.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.items.push(action.payload);
          state.status = "idle";
        }
      )
      .addCase(addVideoToLS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to add video";
      })

      // delete video
      .addCase(deleteVideoToLS.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        deleteVideoToLS.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (video) => video.id !== action.payload
          );
          state.status = "idle";
        }
      )
      .addCase(deleteVideoToLS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error deleting video";
      })

      // update video
      .addCase(updateVideoToLS.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateVideoToLS.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.items = state.items.map((video) =>
            video.id === action.payload.id ? action.payload : video
          );
          state.status = "idle";
        }
      )
      .addCase(updateVideoToLS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error updated video";
      });
  },
});

export default videosSlice.reducer;

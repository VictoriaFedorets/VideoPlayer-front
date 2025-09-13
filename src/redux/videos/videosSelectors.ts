import { RootState } from "../store";

export const selectVideos = (state: RootState) => state.videos.items;

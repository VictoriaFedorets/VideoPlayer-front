import { RootState } from "../store";

export const selectVideos = (state: RootState) => state.videos.items;
export const selectVideoById = (id: string) => (state: RootState) =>
  state.videos.items.find((video) => video.id === id);

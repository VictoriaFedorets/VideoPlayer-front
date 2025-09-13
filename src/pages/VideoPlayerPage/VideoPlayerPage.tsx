import VideoPlayer from "@components/VideoPlayer/VideoPlayer";
import { useLocation } from "react-router-dom";
import { VideoData } from "redux/videos/videosSlice";

export default function VideoPlayerPage() {
  const location = useLocation();
  const video = location.state as VideoData;

  return <VideoPlayer src={video.url} />;
}

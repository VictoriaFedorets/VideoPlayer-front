import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { loadVideosFromLS } from "redux/videos/videosOperations";
import { selectVideos } from "redux/videos/videosSelectors";
import css from "./VideoList.module.css";
import { VideoData } from "redux/videos/videosSlice";
import { useNavigate } from "react-router-dom";
import DeleteVideoBtn from "@components/DeleteVideoBtn/DeleteVideoBtn";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideoListPaginated } from "./hooks/useVideoList";

export default function VideoList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const videos = useAppSelector(selectVideos);

  const { visibleVideos, showMore, fetchMoreVideos, loading } =
    useVideoListPaginated({ videos, perPage: 9, delay: 2000 });

  // const perPage_LOAD = 12;
  // const [visibleVideos, setVisibleVideos] = useState<VideoData[]>([]);
  // const [showMore, setShowMore] = useState(false);

  const getYouTubeThumbnail = (url: string) => {
    try {
      let videoId = null;

      if (url.includes("youtube.com")) {
        videoId = new URL(url).searchParams.get("v");
      } else if (url.includes("youtu.be")) {
        const path = new URL(url).pathname;
        videoId = path.split("/")[1];
      }

      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "/placeholder.png";
    } catch {
      return "/placeholder.png";
    }
  };

  const handleClick = (video: VideoData) => {
    if (video.type === "local" || video.url.endsWith(".mp4")) {
      navigate("/videoPlayer", { state: video });
    } else if (
      video.url.includes("youtube.com") ||
      video.url.includes("youtu.be")
    ) {
      window.open(video.url, "_blank");
    } else {
      window.open(video.url, "_blank");
    }
  };

  // const fetchMoreVideos = () => {
  //   const nextVideos = videos.slice(
  //     visibleVideos.length,
  //     visibleVideos.length + perPage_LOAD
  //   );
  //   setVisibleVideos((prevState) => [...prevState, ...nextVideos]);
  //   if (visibleVideos.length + nextVideos.length >= videos.length) {
  //     setShowMore(false);
  //   }
  // };

  useEffect(() => {
    dispatch(loadVideosFromLS());
  }, [dispatch]);

  // useEffect(() => {
  //   setVisibleVideos(videos.slice(0, perPage_LOAD));
  //   setShowMore(videos.length > perPage_LOAD);
  // }, [videos]);

  return (
    <>
      {visibleVideos.length === 0 ? (
        <h4>No videos yet</h4>
      ) : (
        <InfiniteScroll
          dataLength={visibleVideos.length}
          next={fetchMoreVideos}
          style={{ textAlign: "center" }}
          hasMore={showMore}
          loader={
            loading && (
              <h4 className={css.showMoreMessage}>
                {loading ? "Loading..." : null}
              </h4>
            )
          }
          endMessage={
            <h4 className={css.showMoreMessage}>You have seen all videos!</h4>
          }
        >
          <ul className={css.videoList}>
            {visibleVideos.map((video) => (
              <li key={video.id} className={css.videoItem}>
                <div className={css.containerTitle}>
                  <h4 onClick={() => handleClick(video)}>{video.name}</h4>
                  <DeleteVideoBtn id={video.id} />
                </div>

                <div
                  className={css.previewWrapper}
                  onClick={() => handleClick(video)}
                >
                  {video.type === "local" || video.url.endsWith(".mp4") ? (
                    <video
                      preload="metadata"
                      poster={video.poster || "/placeholder.png"}
                      onError={(e) => {
                        e.currentTarget.poster = "/placeholder.png";
                      }}
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>
                  ) : video.url.includes("youtube.com") ||
                    video.url.includes("youtu.be") ? (
                    <img
                      src={getYouTubeThumbnail(video.url) || "/placeholder.png"}
                      alt="poster video"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  ) : (
                    <div className={css.externalVideo}>
                      External video (click to open)
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
}

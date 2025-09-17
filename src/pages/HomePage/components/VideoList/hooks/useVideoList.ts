import { useEffect, useState } from "react";
import { VideoData } from "redux/videos/videosSlice";

interface UseVideoListPaginated {
  videos: VideoData[];
  perPage?: number;
  delay?: number;
}

export const useVideoListPaginated = ({
  videos,
  perPage = 9,
  delay,
}: UseVideoListPaginated) => {
  const [visibleVideos, setVisibleVideos] = useState<VideoData[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videos || videos.length === 0) {
      setVisibleVideos([]);
      setShowMore(false);
      return;
    }

    const initialVideos = videos.slice(0, perPage);
    setVisibleVideos(initialVideos);

    // тут важно — сравниваем сколько реально загрузили, а не просто длину массива
    setShowMore(initialVideos.length < videos.length);
  }, [videos, perPage]);

  const fetchMoreVideos = async () => {
    if (loading || !showMore) return;

    const startVideos = visibleVideos.length;
    console.log(startVideos);
    const nextVideos = videos.slice(startVideos, startVideos + perPage);
    console.log(nextVideos);

    if (nextVideos.length === 0) {
      setShowMore(false);
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, delay));

    setVisibleVideos((prev) => [...prev, ...nextVideos]);

    // залишились ли ще?
    const isLastPage = startVideos + nextVideos.length >= videos.length;
    setShowMore(!isLastPage);

    setLoading(false);
  };

  return { visibleVideos, showMore, fetchMoreVideos, loading };
};

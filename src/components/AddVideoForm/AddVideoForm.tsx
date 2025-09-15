import { useState } from "react";
import BaseModal from "@components/BaseModal/BaseModal";
import css from "./AddVideoForm.module.css";
import { saveVideoToLS } from "redux/videos/videosOperations";
import { useAppDispatch } from "redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

interface VideoData {
  id: string;
  name: string;
  url: string;
  poster?: string;
  type: "local" | "external";
}

interface VideoFormProps {
  onClose: () => void;
}

interface VideoFormInputs {
  name: string;
  url: string;
  poster?: string;
}

export default function AddVideoForm({ onClose }: VideoFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<VideoFormInputs>();

  const videoURL = watch("url");
  const posterURL = watch("poster");

  const onSubmit: SubmitHandler<VideoFormInputs> = (data) => {
    const type = data.url.startsWith("http") ? "external" : "local";

    const videoData: VideoData = {
      id: uuidv4(),
      name: data.name.trim(),
      url: data.url.trim(),
      poster: data.poster?.trim(),
      type,
    };

    dispatch(saveVideoToLS(videoData));

    toast.success("Video successfully added!");
    reset();
    setIsModalOpen(false);
    onClose();
  };

  const getYouTubeVideoId = (url: string) => {
    try {
      return (
        new URL(url).searchParams.get("v") ||
        url.split("/").pop()?.split("?")[0]
      );
    } catch {
      return "";
    }
  };

  return (
    <>
      {isModalOpen && (
        <BaseModal onClose={onClose}>
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <h2>Add new video</h2>

            <label className={css.label}>
              <p>Name:</p>
              <input
                type="text"
                className={css.input}
                placeholder="Video name"
                defaultValue=""
                {...register("name", {
                  required: "Please enter a video name.",
                })}
              />
              {errors.name && (
                <div className={css.errorWrapper}>
                  {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                  )}
                </div>
              )}
            </label>

            <label className={css.label}>
              <p>Video URL:</p>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                className={css.input}
                defaultValue=""
                {...register("url", {
                  required: "Please enter a video URL.",
                  pattern: {
                    value: /^(https?:\/\/|data:video\/)/i,
                    message: "Please enter a valid video URL.",
                  },
                })}
              />
              <div className={css.errorWrapper}>
                {errors.url && (
                  <p className={css.error}>{errors.url.message}</p>
                )}
              </div>
            </label>

            <label className={css.label}>
              <p>Poster URL:</p>
              <input
                type="url"
                className={css.input}
                placeholder="Video poster URL"
                value={posterURL || ""}
                {...register("poster", {
                  // required: "Please enter a video poster URL.",
                  pattern: {
                    value: /^https?:\/\/.+$/i,
                    message: "Enter a valid image URL",
                  },
                })}
              />
              {errors.poster && (
                <div className={css.errorWrapper}>
                  {errors.poster && (
                    <p className={css.error}>{errors.poster.message}</p>
                  )}
                </div>
              )}
            </label>

            {videoURL && (
              <div className={css.videoPreview}>
                {videoURL.includes("youtube.com") ||
                videoURL.includes("youtu.be") ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      videoURL
                    )}`}
                    title="YouTube video preview"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoURL}
                    poster={posterURL || undefined}
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            <button type="submit" className={css.btn}>
              Save
            </button>
          </form>
        </BaseModal>
      )}
    </>
  );
}

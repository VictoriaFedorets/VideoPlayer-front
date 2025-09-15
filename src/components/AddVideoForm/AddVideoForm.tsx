import { useState } from "react";
import BaseModal from "@components/BaseModal/BaseModal";
import css from "./AddVideoForm.module.css";
import { addVideoToLS } from "redux/videos/videosOperations";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectStatus } from "redux/videos/videosSelectors";

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
  const status = useAppSelector(selectStatus);

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
    dispatch(
      addVideoToLS({
        name: data.name.trim(),
        url: data.url.trim(),
        poster: data.poster?.trim(),
      })
    );

    toast.success("Video successfully added!");
    reset();
    setIsModalOpen(false);
    onClose();
  };

  const getYouTubeVideoId = (url: string) => {
    try {
      return (
        new URL(url).searchParams.get("v") ||
        url.split("/").pop()?.split("?")[0] ||
        ""
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
                {...register("name", {
                  required: "Please enter a video name.",
                })}
              />
              {errors.name && (
                <div className={css.errorWrapper}>
                  <p className={css.error}>{errors.name.message}</p>
                </div>
              )}
            </label>

            <label className={css.label}>
              <p>Video URL:</p>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                className={css.input}
                {...register("url", {
                  required: "Please enter a video URL.",
                  pattern: {
                    value: /^(https?:\/\/|data:video\/)/i,
                    message: "Please enter a valid video URL.",
                  },
                })}
              />
              {errors.url && (
                <div className={css.errorWrapper}>
                  <p className={css.error}>{errors.url.message}</p>
                </div>
              )}
            </label>

            <label className={css.label}>
              <p>Poster URL:</p>
              <input
                type="url"
                className={css.input}
                placeholder="Video poster URL"
                value={posterURL || ""}
                {...register("poster", {
                  pattern: {
                    value: /^https?:\/\/.+$/i,
                    message: "Enter a valid image URL",
                  },
                })}
              />
              {errors.poster && (
                <div className={css.errorWrapper}>
                  <p className={css.error}>{errors.poster.message}</p>
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

            <button
              type="submit"
              className={css.btn}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving..." : "Save"}
            </button>
          </form>
        </BaseModal>
      )}
    </>
  );
}

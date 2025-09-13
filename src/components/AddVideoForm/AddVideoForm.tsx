import { useState, ChangeEvent, FormEvent } from "react";
import BaseModal from "@components/BaseModal/BaseModal";
import css from "./AddVideoForm.module.css";
import { saveVideoToLS } from "redux/videos/videosOperations";
import { useAppDispatch } from "redux/hooks";
import { v4 as uuidv4 } from "uuid";

interface VideoData {
  id: string;
  name: string;
  url: string;
  type: "local" | "external";
}

interface VideoFormProps {
  onClose: () => void;
}

export default function AddVideoForm({ onClose }: VideoFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [videoName, setVideoName] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const dispatch = useAppDispatch();

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   console.log(file);

  //   if (!file) return;

  //   setVideoName(file.name);

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setVideoURL(reader.result as string); // зберігаємо dataURL
  //   };
  //   reader.readAsDataURL(file); // читаємо файл з base64
  // };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoName(e.target.value);
  };

  const handleURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const type = videoURL.startsWith("http") ? "external" : "local";

    const videoData: VideoData = {
      id: uuidv4(),
      name: videoName,
      url: videoURL,
      type,
    };

    // const videoData: VideoData = { name: videoName, url: videoURL };

    dispatch(saveVideoToLS(videoData));

    // const saved = JSON.parse(
    //   localStorage.getItem("videoData") || "[]"
    // ) as VideoData[];

    // const updatedVideoList = [...saved, videoData];

    // localStorage.setItem("videoData", JSON.stringify(updatedVideoList));

    // console.log("Saved to localStorage:", updatedVideoList);

    setVideoName("");
    setVideoURL("");
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <BaseModal onClose={onClose}>
          <form onSubmit={handleSubmit} className={css.form}>
            <h2>Add new video</h2>

            <label className={css.label}>
              Video name:
              <input
                type="text"
                name="name"
                value={videoName}
                onChange={handleNameChange}
                className={css.input}
                placeholder="My video name"
                required
              />
            </label>

            <label className={css.label}>
              Video URL:
              <input
                type="url"
                name="url"
                value={videoURL}
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                onChange={handleURLChange}
                className={css.input}
                required
              />
            </label>

            {videoURL && (
              <div className={css.videoPreview}>
                <video src={videoURL} controls width="100%" height="200">
                  Your browser does not support the video tag.
                </video>
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

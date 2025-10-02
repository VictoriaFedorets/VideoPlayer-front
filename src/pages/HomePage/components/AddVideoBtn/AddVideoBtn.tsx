import { useSelector } from "react-redux";
import css from "./AddVideoBtn.module.css";
import { selectIsLoggedIn } from "redux/user/userSelectors";
import Plus from "icons/Plus";
import { useState } from "react";
import AddVideoForm from "@components/AddVideoForm/AddVideoForm";
import { useAppDispatch } from "redux/hooks";
import { addVideoToLS } from "redux/videos/videosOperations";
import Cat from "/favicon.png";

export default function AddVideoBtn() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddVideo = (data: {
    name: string;
    url: string;
    poster?: string;
  }) => {
    dispatch(
      addVideoToLS({
        name: data.name.trim(),
        url: data.url.trim(),
        poster: data.poster?.trim(),
      })
    );
  };

  return (
    <>
      {isLoggedIn && (
        <button onClick={openModal} className={css.btnPlus}>
          <Plus className={css.iconPlus} />
          {""}add video
          <img className={css.logoCat} src={Cat} alt="cat with camera" />
        </button>
      )}

      {isModalOpen && (
        <AddVideoForm
          title="Add video"
          submitText="Save"
          onClose={closeModal}
          onSubmit={handleAddVideo}
        />
      )}
    </>
  );
}

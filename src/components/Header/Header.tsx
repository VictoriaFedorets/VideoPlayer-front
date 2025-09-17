import Plus from "icons/Plus";
import css from "./Header.module.css";
import { useState } from "react";
import AddVideoForm from "@components/AddVideoForm/AddVideoForm";
import LogoImg from "../images/Logo.png";
import { Link } from "react-router-dom";
import { addVideoToLS } from "redux/videos/videosOperations";
import { useAppDispatch } from "redux/hooks";
import { toast } from "react-toastify";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

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
    <div className={css.conteinerHeader}>
      <Link to="/">
        <img className={css.logo} src={LogoImg} alt="Logo" />
      </Link>
      <button onClick={openModal} className={css.btnPlus}>
        <Plus className={css.iconPlus} />
        {""}add video
      </button>

      {isModalOpen && (
        <AddVideoForm
          title="Add video"
          submitText="Save"
          onClose={closeModal}
          onSubmit={handleAddVideo}
        />
      )}
    </div>
  );
}

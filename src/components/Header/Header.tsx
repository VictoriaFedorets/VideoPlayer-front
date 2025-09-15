import Plus from "icons/Plus";
import css from "./Header.module.css";
import { useState } from "react";
import AddVideoForm from "@components/AddVideoForm/AddVideoForm";
import LogoImg from "../images/Vid.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.conteinerHeader}>
      <Link to="/">
        <img className={css.logo} src={LogoImg} alt="Logo" />
      </Link>
      <button onClick={openModal} className={css.btnPlus}>
        <Plus className={css.iconPlus} />
        {""}add video
      </button>

      {isModalOpen && <AddVideoForm onClose={closeModal} />}
    </div>
  );
}

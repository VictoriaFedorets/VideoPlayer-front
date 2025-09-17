import css from "./DeleteVideoBtn.module.css";
import { useAppDispatch } from "redux/hooks";
import { useNavigate } from "react-router-dom";
import { deleteVideoToLS } from "redux/videos/videosOperations";
import Basket from "icons/Basket";
import { toast } from "react-toastify";
import { useState } from "react";
import AreYouSureModal from "@components/AreYouSureModal/AreYouSureModal";

interface DeleteVideoBtnProps {
  id: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteVideoBtn({ id }: DeleteVideoBtnProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    dispatch(deleteVideoToLS(id)).then(() => {
      toast.success("Video has been deleted!");
      navigate("/");
    });
  };

  return (
    <>
      <button className={css.deleteBtn} onClick={handleOpenModal}>
        <Basket className={css.iconBasket} />
      </button>

      {isModalOpen && (
        <AreYouSureModal
          onConfirm={handleConfirmDelete}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

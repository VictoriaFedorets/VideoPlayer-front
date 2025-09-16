import css from "./DeleteVideoBtn.module.css";
import { useAppDispatch } from "redux/hooks";
import { useNavigate } from "react-router-dom";
import { deleteVideoToLS } from "redux/videos/videosOperations";
import Basket from "icons/Basket";
import { toast } from "react-toastify";
import { useState } from "react";
import AreYouSureModal from "@components/AreYouSureModal/AreYouSureModal";

export default function DeleteVideoBtn({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    dispatch(deleteVideoToLS(id)).then(() => {
      toast.success("Video has been deleted!");
      handleCloseModal();
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

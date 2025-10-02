import { useState } from "react";
import { useAppDispatch } from "redux/hooks";
import { logout } from "../../redux/user/userOperations";
import AreYouSureModal from "@components/AreYouSureModal/AreYouSureModal";

interface LogOutBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // 👈 делаем опциональным
}

export default function LogOutBtn({ className }: LogOutBtnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmLogout = () => {
    dispatch(logout());
    handleCloseModal();
  };

  return (
    <>
      <button onClick={handleOpenModal} className={className}>
        Log out
      </button>

      {isModalOpen && (
        <AreYouSureModal
          onConfirm={handleConfirmLogout}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

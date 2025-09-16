import { useEffect, ReactNode, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Close from "icons/Close";
import css from "./BaseModal.module.css";

interface BaseModalProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function BaseModal({
  onClose,
  children,
  className = "",
}: BaseModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) handleClose();
  };

  return (
    <div className={css.backdrop}>
      <div className={css.overlay} onClick={handleBackdropClick} />
      <div className={`${css.modal} ${className}`}>
        <button className={css.closeButton} onClick={handleClose}>
          <Close className={css.iconClose} />
        </button>
        {children}
      </div>
    </div>
  );
}

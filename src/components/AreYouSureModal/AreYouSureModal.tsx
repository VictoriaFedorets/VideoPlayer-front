import BaseModal from "@components/BaseModal/BaseModal";
import css from "./AreYouSureModal.module.css";

interface AreYouSureModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function AreYouSureModal({
  onClose,
  onConfirm,
}: AreYouSureModalProps) {
  return (
    <BaseModal onClose={onClose} className={css.modalContainer}>
      <h2 className={css.title}>Are you sure?</h2>

      <div className={css.btnContainer}>
        <button onClick={onConfirm} className={css.btnYes}>
          Yes
        </button>
        <button onClick={onClose} className={css.btnNo}>
          No
        </button>
      </div>
    </BaseModal>
  );
}

import css from "./EditVideoBtn.module.css";
import { useState } from "react";
import Edit from "icons/Edit";
import AddVideoForm from "@components/AddVideoForm/AddVideoForm";
import { useAppDispatch } from "redux/hooks";
import { updateVideoToLS } from "redux/videos/videosOperations";

export default function EditVideoBtn({
  id,
  name,
  url,
  poster,
}: {
  id: string;
  name: string;
  url: string;
  poster?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleUpdate = (data: {
    name: string;
    url: string;
    poster?: string;
  }) => {
    dispatch(updateVideoToLS({ id, ...data }));
    handleClose();
  };

  return (
    <>
      <button className={css.editBtn} onClick={handleOpen}>
        <Edit className={css.iconEdit} />
      </button>

      {isModalOpen && (
        <AddVideoForm
          initialValues={{ name, url, poster }}
          onSubmit={handleUpdate}
          onClose={handleClose}
          title="Edit video"
          submitText="Update"
        />
      )}
    </>
  );
}

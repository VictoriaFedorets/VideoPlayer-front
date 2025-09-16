import css from "./EditVideoBtn.module.css";
import { useState } from "react";
import Edit from "icons/Edit";
import BaseModal from "@components/BaseModal/BaseModal";
import AddVideoForm from "@components/AddVideoForm/AddVideoForm";
import { VideoData } from "redux/videos/videosSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { updateVideoToLS } from "redux/videos/videosOperations";
import { toast } from "react-toastify";

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

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //   const video = location.state as {
  //     id: string;
  //     name: string;
  //     url: string;
  //     poster?: string;
  //   };

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleUpdate = (data: {
    name: string;
    url: string;
    poster?: string;
  }) => {
    dispatch(updateVideoToLS({ id, ...data }));
    // console.log(data);
    toast.success("Video successfully updated!");
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

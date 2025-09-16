import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { updateVideoToLS } from "redux/videos/videosOperations";
import { toast } from "react-toastify";
import AddVideoForm from "@components/AddVideoForm/AddVideoForm";

export default function EditVideoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const video = location.state as {
    id: string;
    name: string;
    url: string;
    poster?: string;
  };

  const handleUpdate = (data: {
    name: string;
    url: string;
    poster?: string;
  }) => {
    dispatch(updateVideoToLS({ id: video.id, ...data }));
    // console.log(data);
    toast.success("Video successfully updated!");
  };

  return (
    <AddVideoForm
      initialValues={{
        name: video.name,
        url: video.url,
        poster: video.poster,
      }}
      onSubmit={handleUpdate}
      onClose={() => {}}
      title="Edit video"
      submitText="Update"
    />
  );
}

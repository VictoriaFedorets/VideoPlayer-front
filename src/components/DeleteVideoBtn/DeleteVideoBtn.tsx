import css from "./DeleteVideoBtn.module.css";
import { useAppDispatch } from "redux/hooks";
import { useNavigate } from "react-router-dom";
import { deleteVideoToLS } from "redux/videos/videosOperations";
import Basket from "icons/Basket";
import { toast } from "react-toastify";

export default function DeleteVideoBtn({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteVideoToLS(id)).then(() => {
      navigate("/");
      toast.success("Video has been deleted!");
    });
  };

  return (
    <button className={css.deleteBtn} onClick={handleDelete}>
      <Basket className={css.iconBasket} />
    </button>
  );
}

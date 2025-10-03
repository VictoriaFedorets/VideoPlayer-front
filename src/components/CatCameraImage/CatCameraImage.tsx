import css from "./CatCameraImage.module.css";
import CatCameraImg from "/src/images/cat-camera.png";

const CatCameraImage: React.FC = () => {
  return (
    <img className={css.img} src={CatCameraImg} alt="cat with videocamera" />
  );
};

export default CatCameraImage;

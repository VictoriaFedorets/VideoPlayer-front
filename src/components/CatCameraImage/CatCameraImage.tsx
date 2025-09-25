import css from "./CatCameraImage.module.css";

const CatCameraImage: React.FC = () => {
  return (
    <img
      className={css.img}
      src="/src/components/images/cat-camera.png"
      alt="cat with videocamera"
    />
  );
};

export default CatCameraImage;

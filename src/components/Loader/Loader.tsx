import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className={css.loaderContainer}>
      <ClipLoader
        size={100}
        color="#e9a21e"
        loading={true}
        className={css.loader}
      />
    </div>
  );
};

export default Loader;

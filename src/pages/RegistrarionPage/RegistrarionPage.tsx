import CatCameraImage from "@components/CatCameraImage/CatCameraImage";
import RegistrationForm from "./components/RegistrarionForm/RegistrarionForm";
import css from "./RegistrarionPage.module.css";

export default function RegistrarionPage() {
  return (
    <div className={css.section}>
      <CatCameraImage />
      <RegistrationForm />
    </div>
  );
}

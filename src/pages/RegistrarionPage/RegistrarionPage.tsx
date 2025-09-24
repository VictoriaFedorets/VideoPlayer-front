import RegistrationForm from "./components/RegistrarionForm/RegistrarionForm";
import css from "./RegistrarionPage.module.css";

export default function RegistrarionPage() {
  return (
    <div className={css.section}>
      <img
        className={css.img}
        src="/src/components/images/cat-camera.png"
        alt="cat with videocamera"
      />
      <RegistrationForm />
    </div>
  );
}

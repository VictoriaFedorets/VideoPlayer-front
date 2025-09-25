import CatCameraImage from "@components/CatCameraImage/CatCameraImage";
import LoginForm from "./components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.section}>
      <CatCameraImage />
      <LoginForm />
    </div>
  );
}

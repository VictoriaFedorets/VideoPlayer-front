import css from "./HomePage.module.css";
import VideoList from "@pages/HomePage/components/VideoList/VideoList";
import AddVideoBtn from "./components/AddVideoBtn/AddVideoBtn";

export default function HomePage() {
  return (
    <section className={css.containerHome}>
      <AddVideoBtn />
      <VideoList />
    </section>
  );
}

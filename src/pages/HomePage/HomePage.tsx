import Header from "@components/Header/Header";
import css from "./HomePage.module.css";
import VideoList from "@pages/HomePage/components/VideoList/VideoList";

export default function HomePage() {
  return (
    <section className={css.containerHome}>
      <VideoList />
    </section>
  );
}

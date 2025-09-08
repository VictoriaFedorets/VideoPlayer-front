import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  interface Task {
    id: number;
    title: string;
    patch: string;
  }

  const tasks: Task[] = [
    { id: 1, title: "Audio player", patch: "/audioPlayer" },
  ];

  return (
    <section className={css.containerHome}>
      <h1 className={css.title}>My tranee Capy Bit</h1>
      <ul>
        {tasks.map((task) => (
          <li className={css.taskItem} key={task.id}>
            <Link to={`${task.patch}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

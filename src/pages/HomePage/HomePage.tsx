import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  interface Task {
    id: number;
    title: string;
  }

  const tasks: Task[] = [
    { id: 1, title: "First task" },
    { id: 2, title: "Second task" },
    { id: 2, title: "Next task" },
  ];

  return (
    <section className={css.containerHome}>
      <h1 className={css.title}>My tranee Capy Bit</h1>
      <ul>
        {tasks.map((task) => (
          <li className={css.taskItem} key={task.id}>
            <Link to={"/task/${task.id}"}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

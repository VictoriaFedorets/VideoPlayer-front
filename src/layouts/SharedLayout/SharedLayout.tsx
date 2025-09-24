import css from "./SharedLayout.module.css";
import { Outlet } from "react-router-dom";
import { FC } from "react";
import Header from "@components/Header/Header";

const SharedLayout: FC = () => {
  return (
    <div className={css.container}>
      <Header />
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;

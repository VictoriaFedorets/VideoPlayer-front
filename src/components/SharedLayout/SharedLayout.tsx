import React from "react";
import css from "./SharedLayout.module.css";
import { Outlet } from "react-router-dom";
import { FC } from "react";

const SharedLayout: FC = () => {
  return (
    <div className={css.container}>
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;

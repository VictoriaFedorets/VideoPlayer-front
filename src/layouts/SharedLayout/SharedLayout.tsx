import css from "./SharedLayout.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { FC } from "react";
import Header from "@components/Header/Header";

const SharedLayout: FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`${css.container} ${isHome ? css.homeBg : ""}`}>
      <Header />
      <main className={css.section}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;

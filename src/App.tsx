import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SharedLayout from "@components/SharedLayout/SharedLayout.js";

// import Loader from "./components/Loader/Loader.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.js"));
const AudioPlayer = lazy(
  () => import("./pages/AudioPlayerPage/AudioPlayerPage.js")
);

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />

      <Suspense>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="audioPlayer" element={<AudioPlayer />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

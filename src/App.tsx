import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import SharedLayout from "layouts/SharedLayout/SharedLayout";

const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const VideoPlayer = lazy(
  () => import("@pages/VideoPlayerPage/VideoPlayerPage")
);

export default function App() {
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      /> */}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="videoPlayer" element={<VideoPlayer />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

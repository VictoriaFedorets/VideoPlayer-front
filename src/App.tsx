import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SharedLayout from "layouts/SharedLayout/SharedLayout";
import ScrollToTop from "@components/ScrollToTop/ScrollTo Top";

const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const VideoPlayerPage = lazy(
  () => import("@pages/VideoPlayerPage/VideoPlayerPage")
);
// const EditVideoPage = lazy(() => import("@pages/EditVideoPage/EditVideoPage"));

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
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="videoPlayer" element={<VideoPlayerPage />} />
            {/* <Route path="editVideo" element={<EditVideoPage />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

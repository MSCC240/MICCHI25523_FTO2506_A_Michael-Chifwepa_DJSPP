import Header from "./components/UI/Header";
import AudioPlayer from "./components/AudioPlayer";

import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import ShowDetail from "./pages/ShowDetail";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      {/* Always visible */}
      <Header />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
       <Route path="/podcast/:id" element={<ShowDetail />} />
      </Routes>

      {/* Global Audio Player (always fixed bottom) */}
      <AudioPlayer />
    </>
  );
}

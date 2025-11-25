import { createContext, useContext, useState } from "react";

const FavsContext = createContext();

export function FavsProvider({ children }) {
  const [favs, setFavs] = useState([]);

  const toggleFav = (episode) => {
    setFavs((prev) => {
      const exists = prev.find((e) => e.id === episode.id);

      if (exists) {
        return prev.filter((e) => e.id !== episode.id);
      }
      return [...prev, episode];
    });
  };

  const isFav = (episodeId) => favs.some((e) => e.id === episodeId);

  return (
    <FavsContext.Provider value={{ favs, toggleFav, isFav }}>
      {children}
    </FavsContext.Provider>
  );
}

export function useFavs() {
  return useContext(FavsContext);
}
const addFav = (episode) => {
  const fav = {
    ...episode,
    addedAt: new Date().toISOString()
  };

  const updated = [...favs, fav];
  setFavs(updated);
  localStorage.setItem("favs", JSON.stringify(updated));
};

const removeFav = (id) => {
  const updated = favs.filter(ep => ep.id !== id);
  setFavs(updated);
  localStorage.setItem("favs", JSON.stringify(updated));
};

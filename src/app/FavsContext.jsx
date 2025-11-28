import { createContext, useContext, useState, useEffect } from "react";

const FavsContext = createContext();

export function useFavs() {
  return useContext(FavsContext);
}

export function FavsProvider({ children }) {
  const [favs, setFavs] = useState(() => {
    const saved = localStorage.getItem("favs");
    if (!saved) return [];
    try {
      return JSON.parse(saved).map(f => ({
        ...f,
        title: f.title || "",
        addedAt: typeof f.addedAt === "number" ? f.addedAt : Date.now()
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  const makeKey = (podcastId, episodeId) => `${podcastId}-${episodeId}`;

  const isFav = (podcastId, episodeId) =>
    favs.some(f => f.key === makeKey(podcastId, episodeId));

  const toggleFav = (podcastId, episodeId, episodeData = null) => {
    const key = makeKey(podcastId, episodeId);

    setFavs(prev => {
      const exists = prev.some(f => f.key === key);

      if (exists) {
        return prev.filter(f => f.key !== key);
      }

      if (!episodeData) return prev;

      return [
        ...prev,
        {
          key,
          podcastId,
          episodeId,
          title: episodeData.title ?? "",
          description: episodeData.description ?? "",
          image: episodeData.cover ?? "",
          audioUrl: episodeData.audioUrl ?? "",
          showTitle: episodeData.showTitle ?? "",
          addedAt: Date.now()
        }
      ];
    });
  };

  /** SORTING — centralized so UI becomes simple */
  const sortFavs = (type) => {
    return [...favs].sort((a, b) => {
      if (type === "az") return a.title.localeCompare(b.title);
      if (type === "za") return b.title.localeCompare(a.title);
      if (type === "newest") return b.addedAt - a.addedAt;
      if (type === "oldest") return a.addedAt - b.addedAt;
      return 0;
    });
  };

  return (
    <FavsContext.Provider value={{ favs, isFav, toggleFav, sortFavs }}>
      {children}
    </FavsContext.Provider>
  );
}

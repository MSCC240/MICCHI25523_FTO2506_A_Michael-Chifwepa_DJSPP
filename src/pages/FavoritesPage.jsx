

import { useFavs } from "../app/FavsContext";
import { useAudio } from "../app/AudioContext";

import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";

import SortSelect from "../components/Filters/SortSelect";

import styles from "./FavoritesPage.module.css";

import { FaPlay, FaTrash } from "react-icons/fa";

export default function FavoritesPage() {
  // Global sorting (from PodcastContext)
  const { sortKey } = useContext(PodcastContext);

  // Favorites system
  const { favs, toggleFav } = useFavs();

  // Audio player
  const { playTrack } = useAudio();

  // Handle empty favorites
  if (!favs || favs.length === 0)
    return <p className={styles.empty}>No favorites yet.</p>;

  // Helper to get numeric timestamp from addedAt (supports number or ISO)
  const getTime = (v) => {
    if (v == null) return 0;
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
    const t = Date.parse(String(v));
    return Number.isNaN(t) ? 0 : t;
  };

  // Map canonical sortKey values (support both naming styles)
  // canonical keys we handle:
  // - newest / date-desc  -> newest first
  // - oldest / date-asc   -> oldest first
  // - az / title-asc      -> title A → Z
  // - za / title-desc     -> title Z → A
  const canonicalKey = (() => {
    if (!sortKey) return "newest";
    const k = String(sortKey).toLowerCase();
    if (k === "date-desc" || k === "newest") return "newest";
    if (k === "date-asc" || k === "oldest") return "oldest";
    if (k === "title-asc" || k === "az") return "az";
    if (k === "title-desc" || k === "za") return "za";
    // fallback — try to guess common patterns
    if (k.includes("date") && k.includes("desc")) return "newest";
    if (k.includes("date") && k.includes("asc")) return "oldest";
    if (k.includes("title") && k.includes("asc")) return "az";
    if (k.includes("title") && k.includes("desc")) return "za";
    return "newest";
  })();

  const sorted = (() => {
    // copy to avoid mutating state
    const arr = [...favs];

    switch (canonicalKey) {
      case "newest":
        return arr.sort((a, b) => getTime(b.addedAt) - getTime(a.addedAt));
      case "oldest":
        return arr.sort((a, b) => getTime(a.addedAt) - getTime(b.addedAt));
      case "az":
        return arr.sort((a, b) => {
          const A = (a.title || "").toLowerCase();
          const B = (b.title || "").toLowerCase();
          return A.localeCompare(B);
        });
      case "za":
        return arr.sort((a, b) => {
          const A = (a.title || "").toLowerCase();
          const B = (b.title || "").toLowerCase();
          return B.localeCompare(A);
        });
      default:
        return arr;
    }
  })();

  return (
    <div className={styles.container}>
      <h1>Favourite Episodes</h1>
      <p className={styles.subtitle}>Your saved episodes from all shows</p>

      {/* Sorting Controls ONLY */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Sort by:</label>
          <SortSelect />
        </div>
      </div>

      {/* List of Favorite Episodes */}
      <div className={styles.favList}>
        {sorted.map((ep) => (
          <div key={ep.key} className={styles.card}>
            <img src={ep.image} alt={ep.title} className={styles.cover} />

            <div className={styles.info}>
              <h2>{ep.title || "Untitled Episode"}</h2>

              {(ep.season || ep.episode) && (
                <p className={styles.meta}>
                  {ep.season ? `Season ${ep.season}` : ""}{" "}
                  {ep.episode ? `• Episode ${ep.episode}` : ""}
                </p>
              )}

              <p className={styles.date}>
                Added: {ep.addedAt ? new Date(ep.addedAt).toLocaleDateString() : "Unknown"}
              </p>

              {ep.description && <p className={styles.desc}>{ep.description}</p>}
            </div>

           <div className={styles.actions}>
  <button
    className={styles.playBtn}
    onClick={() =>
      playTrack({
        id: ep.episodeId ?? ep.episode,
        title: ep.title,
        audioUrl: ep.audioUrl,
        cover: ep.image,
        showTitle: ep.showTitle,
      })
    }
  >
    <FaPlay /> Play
  </button>

  <button
    className={styles.removeBtn}
    onClick={() => toggleFav(ep.podcastId, ep.episodeId)}
  >
    <FaTrash />
  </button>
</div>


          </div>
        ))}
      </div>
    </div>
  );
}

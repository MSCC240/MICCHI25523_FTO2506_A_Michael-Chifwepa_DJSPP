import { useFavs } from "../app/FavsContext";
import { usePlayer } from "../app/PlayerContext";
import { useState } from "react";
import FavEpisodeCard from "../components/Favs/FavEpisodeCard";

export default function FavoritesPage() {
  const { favs, removeFav } = useFavs();
  const { playTrack } = usePlayer();

  const [sortBy, setSortBy] = useState("newest");
  const [filterShow, setFilterShow] = useState("all");

  // Group episodes by show title
  const groupedByShow = favs.reduce((acc, ep) => {
    if (!acc[ep.showTitle]) acc[ep.showTitle] = [];
    acc[ep.showTitle].push(ep);
    return acc;
  }, {});

  // Sorting logic
  function sortEpisodes(episodes) {
    if (sortBy === "newest") {
      return [...episodes].sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
      );
    }

    if (sortBy === "oldest") {
      return [...episodes].sort(
        (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
      );
    }

    if (sortBy === "az") {
      return [...episodes].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "za") {
      return [...episodes].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return episodes;
  }

  return (
    <div className="favs-page">

      <h1>Favourite Episodes</h1>
      <p>Your saved episodes from all shows</p>

      {/* Controls */}
      <div className="favs-controls">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest Added</option>
          <option value="oldest">Oldest Added</option>
          <option value="az">A–Z Title</option>
          <option value="za">Z–A Title</option>
        </select>

        <label>Show:</label>
        <select value={filterShow} onChange={(e) => setFilterShow(e.target.value)}>
          <option value="all">All Shows</option>
          {Object.keys(groupedByShow).map(show => (
            <option key={show} value={show}>{show}</option>
          ))}
        </select>
      </div>

      {/* Render grouped episodes */}
      {Object.entries(groupedByShow).map(([showTitle, episodes]) => {
        // Apply show filter
        if (filterShow !== "all" && filterShow !== showTitle) return null;

        const sorted = sortEpisodes(episodes);

        return (
          <section key={showTitle} className="fav-group">
            <h2>{showTitle} ({sorted.length} episodes)</h2>

            {sorted.map(ep => (
              <FavEpisodeCard
                key={ep.id}
                ep={ep}
                onPlay={() => playTrack(ep)}
                onToggleFav={() => removeFav(ep.id)}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

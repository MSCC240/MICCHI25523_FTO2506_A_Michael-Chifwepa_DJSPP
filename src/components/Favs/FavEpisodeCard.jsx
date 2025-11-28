import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";
import { useFavs } from "../../context/FavsContext";

export default function FavEpisodeCard({ ep, onPlay }) {
  const { isFav, toggleFav } = useFavs();

  return (
    <div className="fav-card">
      <img src={ep.image} alt="Cover" className="fav-cover" />

      <div className="fav-content">
        <h3>{ep.title}</h3>
        <p>Episode {ep.episodeId}</p>
        <p className="fav-desc">{ep.description}</p>
        <small>Added: {new Date(ep.addedAt).toLocaleDateString()}</small>
      </div>

      <div className="fav-actions">
        <button className="play-btn" onClick={() => onPlay(ep)}>
          <FaPlay /> Play
        </button>

        <button className="fav-btn" onClick={() => toggleFav(ep)}>
          {isFav(ep.podcastId, ep.episodeId) ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
}

import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";

export default function FavEpisodeCard({ ep, onPlay, onToggleFav }) {
  return (
    <div className="fav-card">
      <img src={ep.cover} alt="Cover" className="fav-cover" />

      <div className="fav-content">
        <h3>{ep.title}</h3>
        <p>Season {ep.season} • Episode {ep.episode}</p>
        <p className="fav-desc">{ep.description}</p>
        <small>Added on {new Date(ep.addedAt).toLocaleDateString()}</small>
      </div>

      <div className="fav-actions">
        <button className="play-btn" onClick={() => onPlay(ep)}>
          <FaPlay /> Play
        </button>

        <button className="fav-btn" onClick={() => onToggleFav(ep.id)}>
          {ep.isFav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
}


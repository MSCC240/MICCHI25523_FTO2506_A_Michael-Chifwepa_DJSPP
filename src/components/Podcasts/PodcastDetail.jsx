import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSinglePodcast } from "../../api/fetchData";
import styles from "./PodcastDetail.module.css";
import { useAudio } from "../../app/AudioContext";
import { useFavs } from "../../app/FavsContext";
import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";

export default function PodcastDetail() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  const { playTrack } = useAudio();
  const { toggleFav, isFav } = useFavs();

  useEffect(() => {
    fetchSinglePodcast(id, setShow, console.error, setLoading);
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!show) return <p className={styles.error}>Show not found.</p>;

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <div className={styles.header}>
        <img src={show.image} alt={show.title} className={styles.cover} />

        <div className={styles.headerInfo}>
          <h1>{show.title}</h1>

          <p className={styles.desc}>{show.description || "No description."}</p>

          <p className={styles.meta}>
            {show.seasons?.length || 0} Seasons • Updated{" "}
            {show.updated
              ? new Date(show.updated).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>
      </div>

      {/* Seasons */}
      {show.seasons?.length > 0 ? (
        show.seasons.map((season) => (
          <div key={season.season} className={styles.seasonSection}>
            <h2 className={styles.seasonTitle}>Season {season.season}</h2>

            <div className={styles.episodeList}>
              {season.episodes?.map((ep) => {
                const epId = ep.id ?? `${season.season}-${ep.episode}`;
              const favStatus = isFav(show.id, epId);


                return (
                  <div key={epId} className={styles.episodeCard}>
                    <div className={styles.episodeInfo}>
                      <h3>{ep.title || "Untitled Episode"}</h3>

                      <p className={styles.epMeta}>
                        Episode {ep.episode ?? "?"} •{" "}
                        {ep.fileType?.toUpperCase() || "AUDIO"}
                      </p>

                      <p className={styles.epDesc}>
                        {ep.description || "No description available."}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                      <button
                        className={styles.playBtn}
                        onClick={() =>
                          playTrack({
                            ...ep,
                            id: epId,
                            showTitle: show.title,
                            cover: show.image,
                          })
                        }
                      >
                        <FaPlay />
                        Play
                      </button>

                    <button
  className={`${styles.favBtn} ${favStatus ? styles.active : ""}`}
  onClick={() =>
    toggleFav(show.id, epId, {
      title: ep.title,
      description: ep.description,
      cover: show.image,
      audioUrl: ep.file,
      showTitle: show.title
    })
  }
>
  {favStatus ? <FaHeart /> : <FaRegHeart />}
</button>


                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p>No seasons available.</p>
      )}
    </div>
  );
}

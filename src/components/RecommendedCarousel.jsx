import { useRef } from "react";
import styles from "./RecommendedCarousel.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { genres as genreMap } from "../data";

export default function RecommendedCarousel({ shows }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 300;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const openShow = (id) => {
    navigate(`/podcast/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      {/* Title */}
      <h2 className={styles.title}>Recommended Shows</h2>

      {/* Arrows */}
      <button className={styles.leftArrow} onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>

      <button className={styles.rightArrow} onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>

      {/* Scrollable row */}
      <div className={styles.carousel} ref={scrollRef}>
        {shows.map((show) => (
          <div
            key={show.id}
            className={styles.card}
            onClick={() => openShow(show.id)}
          >
            <img
              src={show.image}
              alt={show.title}
              className={styles.cover}
            />

            <p className={styles.titleText}>{show.title}</p>

            {/* ⭐ Correct genre lookup */}
            <div className={styles.genreRow}>
              {show.genres?.map((id) => {
                const genre = genreMap.find((g) => g.id === id);

                return (
                  <span key={id} className={styles.genre}>
                    {genre?.title || "Unknown"}
                  </span>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

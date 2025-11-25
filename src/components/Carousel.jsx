import { useRef } from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ children }) {
  const ref = useRef();

  const scroll = (dir) => {
    const container = ref.current;
    container.scrollBy({
      left: dir === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.arrow} onClick={() => scroll("left")}>
        ◀
      </button>

      <div className={styles.container} ref={ref}>
        {children}
      </div>

      <button className={styles.arrow} onClick={() => scroll("right")}>
        ▶
      </button>
    </div>
  );
}

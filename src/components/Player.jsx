import { useAudio } from "../context/AudioContext";
import styles from "./Player.module.css";

export default function Player() {
  const { currentTrack, isPlaying, togglePlay } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className={styles.player}>
      <div className={styles.info}>
        <div className={styles.cover}>Cover</div>
        <div>
          <div className={styles.title}>{currentTrack.title}</div>
          <div className={styles.show}>{currentTrack.show}</div>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={togglePlay} className={styles.button}>
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      <div className={styles.right}>
        2:45 / 15:30
      </div>
    </div>
  );
}

import { useAudio } from "../app/AudioContext";
import styles from "./AudioPlayer.module.css";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaListUl,
} from "react-icons/fa";

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    progress,
    duration,
    seek,
    audioRef,
    volume,
    setVolume,
  } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className={styles.playerBar}>
      {/* LEFT: Thumbnail + Titles */}
      <div className={styles.left}>
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className={styles.thumbnail}
        />

        <div className={styles.text}>
          <p className={styles.title}>{currentTrack.title}</p>
          <p className={styles.subtitle}>{currentTrack.showTitle}</p>
        </div>
      </div>

      {/* CENTER: Player Controls */}
      <div className={styles.center}>
        <div className={styles.controls}>
          <button onClick={prevTrack}>
            <FaStepBackward />
          </button>

          <button className={styles.playBtn} onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={nextTrack}>
            <FaStepForward />
          </button>
        </div>

        {/* Progress + Time */}
        <div className={styles.progressRow}>
          <span className={styles.time}>
            {formatTime(progress)}
          </span>

          <input
            type="range"
            className={styles.progressBar}
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(e.target.value)}
          />

          <span className={styles.time}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* RIGHT: Volume + Playlist */}
      <div className={styles.right}>
        <FaVolumeUp />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          className={styles.volumeSlider}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />

        <FaListUl className={styles.playlistIcon} />
      </div>
    </div>
  );
}

function formatTime(sec) {
  if (!sec) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

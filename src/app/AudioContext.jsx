import { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  
  // PLAY A TRACK
  
  const playTrack = (track) => {
    setCurrentTrack(track);

    if (audioRef.current) {
      audioRef.current.src =
        track.file || track.audio || track.audioUrl || track.url || "";

      audioRef.current.play();
      setIsPlaying(true);
    }
  };


  // TOGGLE PLAY / PAUSE

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // SEEK IN AUDIO
  const seek = (value) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

 
  // UPDATE PROGRESS + DURATION

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const update = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
    };
  }, []);

  // VOLUME CONTROL
 
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);


  
  const nextTrack = () => {
    console.warn("nextTrack not implemented yet.");
  };

  const prevTrack = () => {
    console.warn("prevTrack not implemented yet.");
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        progress,
        duration,
        seek,
        audioRef,
        volume,
        setVolume,
      }}
    >
      {children}

      {/* GLOBAL AUDIO ELEMENT */}
      <audio ref={audioRef} />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}

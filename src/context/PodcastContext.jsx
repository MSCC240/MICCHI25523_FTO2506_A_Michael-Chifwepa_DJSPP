// src/context/PodcastContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { fetchPodcasts } from "../api/fetchData";

export const PodcastContext = createContext();

//
// CENTRAL SORT OPTIONS — Home + Favorites use these
//
export const SORT_OPTIONS = [
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" }
];

//
// Extract genres from all podcasts
// (Later we can map real genre names, but this prevents crashes)
//
function extractGenres(podcasts) {
  const map = new Map();

  podcasts.forEach((p) => {
    p.genres.forEach((g) => {
      if (!map.has(g)) {
        map.set(g, { id: g, title: `Genre ${g}` });
      }
    });
  });

  return Array.from(map.values());
}

export function PodcastProvider({ children }) {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Global filtering + sorting
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortKey, setSortKey] = useState("date-desc");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //
  // FETCH PODCASTS
  //
  useEffect(() => {
    async function load() {
      fetchPodcasts(
        (data) => {
          setAllPodcasts(data);
          setGenres(extractGenres(data));
        },
        setError,
        setLoading
      );
    }
    load();
  }, []);

  //
  // PAGE SIZE BASED ON SCREEN WIDTH
  //
  useEffect(() => {
    const updatePageSize = () => {
      const w = window.innerWidth;

      if (w <= 1024) {
        setPageSize(10);
        return;
      }

      const cardWidth = 260;
      const maxRows = 2;
      const cols = Math.floor(w / cardWidth);
      setPageSize(cols * maxRows);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  //
  // RESET PAGE ON FILTER CHANGE
  //
  useEffect(() => setPage(1), [search, genre, sortKey]);

  //
  // APPLY FILTERS + SORT
  //
  function applyFilters() {
    let data = [...allPodcasts];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (genre !== "all") {
      data = data.filter((p) => p.genres.includes(Number(genre)));
    }

    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
      default:
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    return data;
  }

  const filtered = applyFilters();

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  //
  // PROVIDE EVERYTHING
  //
  return (
    <PodcastContext.Provider
      value={{
        // States
        loading,
        error,
        search,
        setSearch,
        genre,
        setGenre,
        sortKey,
        setSortKey,

        // Pagination
        page: currentPage,
        setPage,
        totalPages,

        // Podcast data
        podcasts: paged,
        allPodcasts,
        genres,
        allPodcastsCount: filtered.length,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

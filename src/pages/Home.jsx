import SearchBar from "../components/Filters/SearchBar";
import SortSelect from "../components/Filters/SortSelect";
import GenreFilter from "../components/Filters/GenreFilter";
import PodcastGrid from "../components/Podcasts/PodcastGrid";
import Pagination from "../components/UI/Pagination";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

import RecommendedCarousel from "../components/RecommendedCarousel";

import styles from "./Home.module.css";
import { genres } from "../data";
import { PodcastContext } from "../context/PodcastContext";
import { useContext } from "react";


/**
 * Home page of the Podcast Explorer app.
 */
export default function Home() {
  const { podcasts, loading, error } = useContext(PodcastContext);

  return (
    <main className={styles.main}>

      {/*  Recommended Shows Section */}
      {podcasts.length > 0 && (
        <section className={styles.recommended}>
          <RecommendedCarousel shows={podcasts.slice(0, 10)} />
        </section>
      )}

      {/*  Filters + Sorting */}
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      {/*  Loading + Error */}
      {loading && <Loading message="Loading podcasts..." />}
      {error && (
        <Error message={`Error occurred while fetching podcasts: ${error}`} />
      )}

      {/*  Podcast Grid + Pagination */}
      {!loading && !error && (
        <>
          <PodcastGrid />
          <Pagination />
        </>
      )}
    </main>
  );
}

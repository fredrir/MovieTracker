import { Movie, MoviesResponse } from "@/models/movie";
import { useRouter } from "next/navigation";
import FilmCard from "../FilmCard/FilmCard";
import { useState, useEffect, useCallback } from "react";
import { GET as GETSearch } from "@/app/api/movie-search/route";
import { GET as GETTrending } from "@/app/api/get-trending-movies/route";
import { GET as GETGenre } from "@/app/api/movies-by-genre/route";
import { GenreMap } from "../../utils/getGenreFromId";
interface CoverFlowProps {
  type: "Search" | "Trending" | "Genre";
  searchQuery?: string;
  where?: String;
}

const CoverFlow: React.FC<CoverFlowProps> = ({ type, searchQuery, where }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const genreArray = Array.from(GenreMap); // array of arrays
  const [selectedGenre, setSelectedGenre] = useState("Genre:");
  const [oldSelectedGenre, setOldSelectedGenre] = useState("Genre:");
  const [fetching, setFetching] = useState(false);

  const loadMore = useCallback(async () => {
    setTimeout(() => setFetching(false), 300);
    if (!fetching) {
      setFetching(true);
    } else {
      return;
    }
    let oldMovies: Movie[] = [];
    if (selectedGenre == oldSelectedGenre) {
      oldMovies = movies;
    }
    if (type == "Trending" && selectedGenre == "Genre:") {
      const url = `/api/get-trending-movies?page=${page}`;
      const request = new Request(url);
      const response = await GETTrending(request);
      const data = await response.json();
      setMovies(oldMovies.concat(await data.data.results));
    } else if (
      type == "Search" &&
      searchQuery != null &&
      selectedGenre == "Genre:"
    ) {
      const url = `/api/movie-search?page=${page}&query=${searchQuery}`;
      const request = new Request(url);
      const response = await GETSearch(request);
      const data = await response.json();
      setMovies(oldMovies.concat(await data.data.results));
    } else if (selectedGenre != "Genre:") {
      const url = `/api/movies-by-genre?page=${page}&genre=${selectedGenre}`;
      const request = new Request(url);
      const response = await GETGenre(request);
      const data = await response.json();
      setMovies(oldMovies.concat(await data.data.results));
    }
    setOldSelectedGenre(selectedGenre);
  }, [
    type,
    searchQuery,
    selectedGenre,
    page,
    fetching,
    movies,
    oldSelectedGenre,
  ]);

  const handleScroll = useCallback(() => {
    //Prevent multiple fetches
    const distanceToBottom =
      document.body.scrollHeight - window.innerHeight - window.scrollY;
    if (distanceToBottom < 50) {
      setPage(page + 1);
      loadMore();
    }
  }, [loadMore, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setPage(1);
    loadMore();
  }, [selectedGenre, type, loadMore]);

  return (
    <>
      <div className="mb-5 content-center flex w-full justify-around pl-4 pr-4">
        {genreArray.map((array, index) => (
          <button
            className={`outline outline-2 mt-3 mx-1 rounded  ${selectedGenre == array[0] ? "bg-zinc-400 text-white outline-black" : " hover:bg-slate-700"}`}
            key={index}
            onClick={() => {
              setSelectedGenre(array[0].toString());
            }}
          >
            <div className="mr-1 ml-1 text-sm">{array[1]}</div>
          </button>
        ))}
      </div>{" "}
      {/* her viser vi frem alle filmene i griddet */}
      <div className="grid grid-cols-6 gap-2" onScroll={handleScroll}>
        {movies?.map((movie: Movie) => (
          <FilmCard
            key={movie.id}
            title={movie.title}
            image={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
            description=""
            onClick={() => {
              router.push(`/${movie.id}`);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CoverFlow;

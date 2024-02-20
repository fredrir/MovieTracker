import { Movie, MoviesResponse } from "@/models/movie";
import { useRouter } from "next/navigation";
import FilmCard from "../FilmCard/FilmCard";
import { useState, useEffect, useCallback } from "react";
import { GET as GETSearch } from "@/app/api/movie-search/route";
import { GET as GETTrending } from "@/app/api/get-trending-movies/route";
import { GET as GETGenre } from "@/app/api/movies-by-genre/route";
import { SelectChangeEvent } from "@mui/material/Select";
import { GenreMap } from "../../utils/getGenreFromId";

interface CoverFlowProps {
  type: "Search" | "Trending" | "Genre";
  searchQuery?: string;
  genre?: number;
  where?: String;
}

const CoverFlow: React.FC<CoverFlowProps> = ({ type, searchQuery, genre, where }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const genreArray = Array.from(GenreMap); // array of arrays
  const [selectedGenre, setSelectedGenre] = useState("Genre:");

  


  const loadMore = useCallback( async () => {
    if (type == "Trending") {
      const url = `http://localhost:3000/api/get-trending-movies?page=${page}`;
      const request = new Request(url);
      const response = await GETTrending(request);
      const data = await response.json();
      //check if movies is empty
      (movies.length == 0) ? setMovies(data.data.results) : setMovies(movies.concat(data.data.results));
    } else if (type == "Search" && searchQuery != null) {
      const url = `http://localhost:3000/api/movie-search?page=${page}&query=${searchQuery}`;
      const request = new Request(url);
      const response = await GETSearch(request);
      const data = await response.json();
      (movies.length == 0) ? setMovies(data.data.results) : setMovies(movies.concat(data.data.results));
    }

  }, [type, page, searchQuery, movies])

  const handleScroll = useCallback( () => {
    const distanceToBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;
    if (distanceToBottom<50){
      setPage(page+1) 
      loadMore()
    }
  },[loadMore,page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);



  const handleGenreChange = () => (event: SelectChangeEvent) => {
    setSelectedGenre(event.target.value);
  };

  useEffect(() => {
    setPage(1)
    loadMore();
  }, []);

  useEffect( () =>{
    setPage(1)
    setMovies([])
    loadMore()
  },[genre])

  useEffect(() => {
    async function fetchMovies() {
      if (type != "Search" && selectedGenre!="Genre:" ) {
        const url = `http://localhost:3000/api/movies-by-genre?page=${page}&genre=${selectedGenre}`;
        const request = new Request(url);
        const response = await GETGenre(request);
        const data = await response.json();
        (movies.length == 0) ? setMovies(data.data.results) : setMovies(movies.concat(data.data.results));
      }
    }
    fetchMovies();
  }, [selectedGenre, page, type, genre, where]);

  return (
    <>
      <div className="mb-5 content-center flex w-full justify-around pl-4 pr-4">
        {genreArray.map((array,index) => (
          <button
            className={`outline outline-2 mt-3 mx-1 rounded  ${selectedGenre == array[0] ? "bg-zinc-400 text-white outline-black" : " hover:bg-slate-700"}`}
            key={index}
            onClick={() => {
              setSelectedGenre(array[0]);
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
              router.push(`/homepage/${movie.id}`);
            }}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className="outline outline-2 mt-3 p-1 rounded hover:bg-slate-700"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            } else {
              console.log("nope");
            }
          }}
        >
          Previous page
        </button>
        <button
          className="outline outline-2 mt-3 p-1 rounded hover:bg-slate-700"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next page
        </button>
      </div>
    </>
  );
};

export default CoverFlow;

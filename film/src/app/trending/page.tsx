"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { mostWatchedMovies } from "@/utils/getMostWatchedMovies";
import { Movie } from "@/models/movie";
import { useRouter } from "next/navigation";
import { GET } from "../api/movie-details/route";

async function fetchMovie(movie: number): Promise<Movie> {
  const url = `/api/movie-details?id=${movie}`;
  const request = new Request(url);
  const first = await GET(request);
  const data = await first.json();
  return data.data;
}

export default function HomePage() {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function getMostWatchedMovies() {
      try {
        const movie_ids = await mostWatchedMovies();
        const movies = await Promise.all(movie_ids.map(fetchMovie));
        setMovies(movies);
      } catch (error) { }
    }
    getMostWatchedMovies();
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl">Most watched by our users</h1>
      <div className="grid grid-cols-6 gap-2">
        {movies?.map((movie) => (
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
}

"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { mostWatchedMovies } from "@/utils/getMostWatchedMovies";
import { Movie } from "@/models/movie";
import router from "next/router";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function getMostWatchedMovies() {
      try {
        const movies: Movie[] = await mostWatchedMovies();
      } catch (error) {}
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

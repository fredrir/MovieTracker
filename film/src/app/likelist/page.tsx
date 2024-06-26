"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { GET } from "../api/movie-details/route";
import { MovieDetails } from "@/models/movieDetails";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [ids, setIds] = useState<number[]>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails[]>();

  async function fetchMovie(movie: number) {
    const url = `/api/movie-details?id=${movie}`;
    const request = new Request(url);
    const first = await GET(request);
    const data = await first.json();
    return data.data;
  }

  async function fetchDb(table: string, setter: (v: number[]) => void) {
    const userId = localStorage.getItem("userId" || "1");
    if (!userId) {
      console.error("User ID not found in cookies");
      return;
    }
    const url = `/api/db/${table}-list?userid=${userId}`;
    const response = await fetch(url);
    const json: { films: number[] } = await response.json();
    setter(json.films);
  }

  useEffect(() => {
    fetchDb("like", setIds);
  }, []);

  useEffect(() => {
    (async () => {
      if (ids === undefined) {
        return;
      }

      const movies = await Promise.all(
        ids.map(async (id) => await fetchMovie(id)),
      );
      setMovieDetails(movies);
    })();
  }, [ids]);

  return (
    <>
      <h1 className="text-center text-4xl">Liked Movies</h1>
      <div className="grid grid-cols-6 gap-2">
        {movieDetails?.map((movie) => (
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

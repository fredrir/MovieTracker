"use client";

import { useEffect, useState } from "react";
import FilmCard from "@/components/FilmCard/FilmCard";
import { getUnRecomendedGenres } from "@/utils/unRecommendedGenres";
import { Movie } from "@/models/movie";
import { useRouter } from "next/navigation";

export default function UnReconemdations() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function getNewMovies() {
      try {
        const userId = localStorage.getItem("userId") || "1";
        if (!userId) {
          console.error("User ID not found in cookies");
          return;
        }
        const genres: number[] = await getUnRecomendedGenres(userId);
        const url = `/api/movie-recommendations?genre=${genres.join(",")}`;
        const request = new Request(url);
        const response = await fetch(request);
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.results)) {
          setMovies(data.data.results);
        } else {
          console.error("Unexpected response structure:", data);
          setMovies([]);
        }
      } catch (error) {
        console.error("Failed to fetch new movies", error);
        setMovies([]);
      }
    }
    getNewMovies();
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl">Your worst performers</h1>
      <div className="grid grid-cols-6 gap-2">
        {movies.slice(0, 10).map((movie) => (
          <FilmCard
            key={movie.id}
            title={movie.title}
            image={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
            description=""
            onClick={() => router.push(`/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

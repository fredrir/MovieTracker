"use client";
import { GET } from "@/app/api/movie-details/route";
import { MovieOverviewCard } from "@/components/MovieOverviewCard/MovieOverviewCard";
import { MovieDetails } from "@/models/movieDetails";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  /* Fetch movie data */
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const router = useRouter();

  useEffect(() => {
    async function fetchMovies() {
      const url = `/api/movie-details?id=${params.id}`;
      const request = new Request(url);
      const response = await GET(request);
      const data = await response.json();
      setMovieDetails(data.data);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <div className="justify-center flex">
        {movieDetails && (
          <MovieOverviewCard
            movie_title={movieDetails?.title}
            movie_image={movieDetails?.backdrop_path}
            movie_description={movieDetails?.overview}
            movie_id={movieDetails?.id}
          />
        )}
      </div>
    </>
  );
}

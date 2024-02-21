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
      console.log(params.id);
      const url = `http://localhost:3000/api/movie-details?id=${params.id}`;
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
        {movieDetails && <MovieOverviewCard
          movie_title={movieDetails?.title}
          movie_image={movieDetails?.backdrop_path}
          movie_description={movieDetails?.overview}
          movie_id={movieDetails?.id}
        />}
      </div>
      {/* <button 
      className="fixed bottom-20 left-10 outline p-2 rounded hover:bg-slate-700"
      onClick={() => router.push("/homepage")}
      >&#60;----</button> */}
    </>
  );
}

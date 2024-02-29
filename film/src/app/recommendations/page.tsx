"use client";
import { Movie } from "@/models/movie"; 
import { getRecomendedGenres } from "@/utils/recommendedGenres";
import { useEffect, useState } from "react";
import { GET } from "../api/movie-recommendations/route";

export default function Recomendations() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function getNewMovies() {
      try {
        const genres: number[] = await getRecomendedGenres("1");
        console.log("genres" + genres);
        const url = `/api/movie-recommendations?genre=${genres.join(",")}`;
        const request = new Request(url);
        const response = await GET(request);
        const data = await response.json();
        console.log("fetched data" + (await JSON.stringify(data)));
        setMovies(data.data.results);
      } catch (error) {}
    }
    getNewMovies();
  }, []);

  return (
    <div>
      <h1>Recommendations</h1>
      {movies?.map((movie, index) => {
        return (
          <div key={index}>
            <h1>{movie.title}</h1>
          </div>
        );
      })}
    </div>
  );
}

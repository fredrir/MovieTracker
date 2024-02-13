// 'use client';
import FilmCard from "@/app/filmcards/FilmCard";
import { useRouter } from "next/router";
import { Movie, MoviesResponse } from "../models/movie";
import RootLayout from "../src/app/layout";
import { useEffect, useState } from "react";

/*class Movie {
  id: string = "";
  title: string = "";
  image: string = "";
  description: string = "";
}*/

export default function Home() {
  const router = useRouter();
  const handleFilmClick = (filmID: number) => {
    router.push(`/movies/${filmID}`);
  };
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Function to fetch movies from the API
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=${roundPage}&region=NO');
        const data: MoviesResponse = await response.json();
        setMovies(data.results); // Assuming the API response contains the movie results directly
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // adding a movie this way is temporary until the API works and we get real movies
  /*const m = new Movie();
  m.id = "1";
  m.title = "title";
  m.image = "https://picsum.photos/id/237/200/300";
  m.description = "dog";
  movies.push(m);*/

  return (
    <RootLayout>
      <div>
        <h1>Movie Gallery</h1>
        <div className="movie-grid">
          {movies.map((movie: Movie) => (
            <FilmCard
              key={movie.id}
              title={movie.title}
              image={movie.backdrop_path}
              description={movie.overview}
              onClick={() => handleFilmClick(movie.id)} //handleFilmClick is a function that opens a different page that includes more information about the movie
            />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}

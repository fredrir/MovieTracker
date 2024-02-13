// 'use client';
import FilmCard from "@/app/filmcards/FilmCard";
import { useRouter } from "next/router";
import { Movie, MoviesResponse } from "../../models/movie";
import RootLayout from "../../app/layout";
import { useEffect, useState } from "react";
import { GET } from "@/app/api/get-trending-movies/route";

/*class Movie {
  id: string = "";
  title: string = "";
  image: string = "";
  description: string = "";
}*/

export default async function Home() {
  const router = useRouter();
  const handleFilmClick = (filmID: number) => {
    router.push(`/movies/${filmID}`);
  };

    const url = "http://localhost:3000/api/get-trending-movies?page=2";
    const request = new Request(url);
    const response = await GET(request);
    const data = await response.json();

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
          {data.map((movie: Movie) => (
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
};

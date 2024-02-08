// 'use client';
import Navbar from "../src/app/ui/navbar";
import RootLayout from "../src/app/layout";
import Image from "next/image";
import FilmCard from "@/app/filmcards/FilmCard";
import { useRouter } from "next/router";

class Movie {
  id: string = "";
  title: string = "";
  image: string = "";
  description: string = "";
}

export default function Home() {
  const router = useRouter();
  const handleFilmClick = (filmID: string) => {
    router.push(`/movies/${filmID}`);
  };

  const movies: Array<Movie> = [];

  // adding a movie this way is temporary until the API works and we get real movies
  const m = new Movie();
  m.id = "1";
  m.title = "title";
  m.image = "https://picsum.photos/id/237/200/300";
  m.description = "dog";
  movies.push(m);

  return (
    <RootLayout>
      <div>
        <h1>Movie Gallery</h1>
        <div className="movie-grid">
          {movies.map((movie) => (
            <FilmCard
              key={movie.id}
              title={movie.title}
              image={movie.image}
              description={movie.description}
              onClick={() => handleFilmClick(movie.id)} //handleFilmClick is a function that opens a different page that includes more information about the movie
            />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}

import Image from "next/image";
import { useEffect, useState } from "react";

export type MovieOverviewCardProps = {
  movie_title: string;
  movie_image: string;
  movie_description: string;
  movie_id: number;
};

export const MovieOverviewCard: React.FC<MovieOverviewCardProps> = ({
  movie_title,
  movie_image,
  movie_description,
  movie_id,
}) => {
  const [like, setLike] = useState<boolean>();
  const [watched, setWatched] = useState<boolean>();

  async function fetchDb(table: string, setter: (v: boolean) => void) {
    const url = `/api/db/${table}-list?userid=1`;
    const response = await fetch(url);
    const json: { films: number[] } = await response.json();
    const in_set = json.films.includes(movie_id);
    setter(in_set)
  }

  useEffect(() => { fetchDb("like", setLike); }, []);
  useEffect(() => { fetchDb("watched", setWatched); }, []);

  async function updateDb(table: string, setter: (v: boolean) => void, value: boolean) {
    const method = value ? "delete" : "insert";
    await fetch(`/api/db/${table}-${method}?filmid=${movie_id}&userid=1`);
    setter(!value);
  }

  return (
    <div className="grid grid-cols-1 items-center w-1/3">
      <h1 className="text-center text-xl mt-5 mb-5">{movie_title}</h1>
      <Image
        alt="movie backdrop"
        src={"https://image.tmdb.org/t/p/original/" + movie_image}
        className="width-100"
        width={500}
        height={700}
      />
      <h2 className="mt-5"><b>Description:</b></h2>
      <h2>{movie_description}</h2>
      <div className="flex justify-start mb-10">
        <button
          className="outline mt-3 p-1 rounded hover:bg-slate-700"
          onClick={like !== undefined ? () => updateDb("like", setLike, like) : () => { }}
        >
          {like === undefined ? "Loading..." : (like ? "Remove from favorites ❌" : "Add to favorites 🌟")}
        </button>

        <button className="outline ml-4 mt-3 p-1 rounded hover:bg-slate-700"
          onClick={watched !== undefined ? () => updateDb("watched", setWatched, watched) : () => { }}
        >
          {watched === undefined ? "Loading..." : (watched ? "Remove from watchlist 🙈" : "Add to watched 👀")}
        </button>
      </div>
    </div>
  );
};

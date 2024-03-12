import { dialogTitleClasses, Dialog } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
  const [unlike, setUnlike] = useState<boolean>();
  const [trailerURL, setTrailerURL] = useState<string>(); //URLen fra TMDB som peker oss til YouTube (eller annen site) som så viser traileren
  const [openYouTubeURL, setOpenYouTubeURL] = useState<boolean>(false); //default er False, dvs vi skal ikke vise YouTube-videoen med en gang

  const fetchDb = useCallback(
    async (table: string, setter: (v: boolean) => void) => {
      const url = `/api/db/${table}-list?userid=${localStorage.getItem("userId")}`;
      const response = await fetch(url);
      const json: { films: number[] } = await response.json();
      const in_set = json.films.includes(movie_id);
      setter(in_set);
    },
    [movie_id],
  );

  useEffect(() => {
    fetchDb("like", setLike);
  }, [fetchDb]);
  useEffect(() => {
    fetchDb("watched", setWatched);
  }, [fetchDb]);
  useEffect(() => {
    fetchDb("unlike", setUnlike);
  }, [fetchDb]);

  async function updateDb(
    table: string,
    setter: (v: boolean) => void,
    value: boolean,
  ) {
    const method = value ? "delete" : "insert";
    await fetch(
      `/api/db/${table}-${method}?filmid=${movie_id}&userid=${localStorage.getItem("userId")}`,
    );
    setter(!value);
  }

  interface Video {
    //json-objektet som mottas fra TMDB som inneholder trailer-IDen kommer i dette formatet
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }

  async function viewTrailer(movie_id: number) {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const trailer = data.results.find(
      (video: Video) => video.type === "Trailer" && video.site === "YouTube",
    );
    if (trailer && trailer.site === "YouTube") {
      const urlYouTube = `https://www.youtube.com/embed/${trailer.key}`; //ved å bruke /embed istendemfor /watch så får vi lov å spille av youtube i samme fane, istedenfor en ny en
      setTrailerURL(urlYouTube); //nå oppdateres HTMLen fordi state endret seg
      //vi kan ikke kaste urlYouTube inn i HTMLen fordi det er en lokal variabel inni viewTrailer(). Derfor trenger vi setTrailerUrl
      setOpenYouTubeURL(true); //i HTML åpner vi Youtube kun om OpenYouTubeURL=true
    } else {
      const urlYouTube = `https://www.youtube.com/embed/dQw4w9WgXcQ`; //dersom filmen ikke har en trailer viser vi rickroll
      setTrailerURL(urlYouTube); //nå oppdateres HTMLen fordi state endret seg
      setOpenYouTubeURL(true); //i HTML åpner vi Youtube kun om OpenYouTubeURL=true
    }
  }

  return (
    <div className="grid grid-cols-1 items-center w-1/3">
      <h1 className="text-center text-xl mt-5 mb-5">{movie_title}</h1>

      <img
        alt="movie backdrop"
        src={
          movie_image
            ? `https://image.tmdb.org/t/p/original/${movie_image}`
            : "https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg"
        }
        className="cursor-pointer text-white font-bold py-4 px-8 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        width={500}
        height={700}
        onClick={() => viewTrailer(movie_id)} //bilde er knappen for å se traileren
      />

      <Dialog
        open={openYouTubeURL}
        onClose={() => setOpenYouTubeURL(false)}
        maxWidth="lg"
      >
        {trailerURL && (
          <iframe
            src={trailerURL}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "800px", height: "450px" }}
          ></iframe>
        )}
      </Dialog>

      <h2 className="mt-5">
        <b>Description:</b>
      </h2>
      <h2>{movie_description}</h2>
      <div className="flex justify-start mb-10">
        <button
          className="outline mt-3 p-1 rounded hover:bg-slate-700"
          onClick={
            like !== undefined
              ? () => updateDb("like", setLike, like)
              : () => {}
          }
        >
          {like === undefined
            ? "Loading..."
            : like
              ? "Remove from favorites ❌"
              : "Add to favorites 🌟"}
        </button>

        <button
          className="outline ml-4 mt-3 p-1 rounded hover:bg-slate-700"
          onClick={
            watched !== undefined
              ? () => updateDb("watched", setWatched, watched)
              : () => {}
          }
        >
          {watched === undefined
            ? "Loading..."
            : watched
              ? "Remove from watchlist 🙈"
              : "Add to watched 👀"}
        </button>

        <button
          className="outline mt-3 ml-3 rounded hover:bg-slate-700"
          onClick={
            unlike !== undefined
              ? () => updateDb("unlike", setUnlike, unlike)
              : () => {}
          }
        >
          {unlike === undefined
            ? "Loading..."
            : unlike
              ? "Remove from un-liked movies ❌"
              : "Add to unlike ❤️‍🔥"}
        </button>
      </div>
    </div>
  );
};

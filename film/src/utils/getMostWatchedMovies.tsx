import { GET } from "@/app/api/movie-details/route";

export async function mostWatchedMovies(){
    const response = await fetch("/api/db/watched-most")
    const json = await response.json();
    return json.films;
}

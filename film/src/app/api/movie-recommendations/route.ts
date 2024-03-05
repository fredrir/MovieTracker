import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre") || "28";
    const genreParam = encodeURIComponent(genre);
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreParam}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGM3NjVlOGEyYzFjZmU5OTUxN2JiNDdjM2U2Zjg4NCIsInN1YiI6IjY1YzIwMGFiOTU5MGUzMDE4MmIyNzJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VB2tWiR46PpfZrJa4lbcbTgYADSVjcAUjjjhTZkIOm8",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}

function formatGenre(genreStr: string) {
  return;
}

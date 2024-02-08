import type { NextApiRequest, NextApiResponse } from "next";
import { MoviesResponse } from "../../../../models/movie";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const query = searchParams.get("query") || "Dune";
    const fetch = require("node-fetch");
    const roundPage = Math.round(
      typeof page === "string" ? parseInt(page, 10) : 1,
    );
    const searchQuery = typeof query === "string" ? query : "";
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=${roundPage}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGM3NjVlOGEyYzFjZmU5OTUxN2JiNDdjM2U2Zjg4NCIsInN1YiI6IjY1YzIwMGFiOTU5MGUzMDE4MmIyNzJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VB2tWiR46PpfZrJa4lbcbTgYADSVjcAUjjjhTZkIOm8",
      },
    };

    const response = await fetch(url, options);
    return Response.json({ response });
  } catch (error) {
    return Response.json({ 404: "error" });
  }
}

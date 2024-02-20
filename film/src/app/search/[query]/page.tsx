"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { MoviesResponse } from "@/models/movie";
import { useRouter } from "next/navigation";
import { GET } from "@/app/api/movie-search/route";
import CoverFlow from "@/components/MovieCoverFlow/CoverFlow";

export default function HomePage({ params }: { params: { query: string } }) {
  const [movies, setMovies] = useState<MoviesResponse>();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchQuery = params.query;

  return (
    <>
      <CoverFlow type="Search" searchQuery={searchQuery} />
    </>
  );
}

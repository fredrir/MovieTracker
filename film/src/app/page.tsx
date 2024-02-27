"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { GET } from "./api/get-trending-movies/route";
import { MoviesResponse } from "@/models/movie";
import { useRouter } from "next/navigation";
import CoverFlow from "@/components/MovieCoverFlow/CoverFlow";

export default function HomePage() {
  return (
    <>
      <CoverFlow type="Trending" where="main" />
    </>
  );
}

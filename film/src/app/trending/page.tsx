"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { GET } from "../api/movie-details/route";
import { MovieDetails } from "@/models/movieDetails";
import { useRouter } from "next/navigation";

export default function HomePage() {

    return (
        <>
        <h1 className="text-center text-4xl">Most watched by our users</h1>
        <div className="grid grid-cols-6 gap-2">
        </div>
        </>
    )
}
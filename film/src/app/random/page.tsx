"use client";
import { MovieOverviewCard } from "@/components/MovieOverviewCard/MovieOverviewCard";
import { MovieDetails } from "@/models/movieDetails";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RandomPage() {
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const randomInt = (min:number, max:number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumber: number= randomInt(100000,900000);
    const randomUrl=`/${randomNumber}` //url that redirect to the overview of random movie
    const router = useRouter();
    const handleButtonClick = () => {
        router.push(randomUrl);
    }
    

    return (
        <>
        <div className="justify-center flex">
        <h1>Random movie</h1>

            {/* FORSLAG 1:
            <Button onClick={handleButtonClick}>
                Get a random movie
            </Button>*/}


            {/* FORSLAG 2:
            <MovieOverviewCard 
            movie_title={movieDetails?.title}
            movie_image={movieDetails?.backdrop_path}
            movie_description={movieDetails?.overview}
            movie_id={movieDetails?.id}
            />*/}
        </div>
        </>
    )
}

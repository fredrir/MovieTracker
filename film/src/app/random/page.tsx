"use client";
import { MovieDetails } from "@/models/movieDetails";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GET } from "../api/movie-details/route";


export default function RandomPage() {
//fetching movie data
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const [movieFetched, setMovieFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const randomInt = (min:number, max:number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumber: number= randomInt(1,900000);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchMovies() {
            setIsLoading(true);
            try {
                const randomUrl = `/api/movie-details?id=${randomNumber}`;
                const request = new Request(randomUrl);
                const response = await GET(request);
                if (!response.ok){
                    throw new Error("Failed to fetch movie");
                }
                const data = await response.json();
                setMovieDetails(data.data);
                setMovieFetched(true); //set to true after successfully fetching a movie, so it doesn't fetch more                
            } catch (error) {
                console.error("Error fetching movie: ", error)
            }
            finally{
                setIsLoading(false);
            }
        }
        if (!movieFetched){
            fetchMovies();
        }

    }, [randomNumber, movieFetched]);
    
    const handleButtonClick = () => {
        if (movieDetails?.id) {
            router.push(`/${movieDetails.id}`); // Navigate to movie details page with movie ID
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                {isLoading && <p>Loading...</p>}
                {!isLoading && movieFetched && (
                    <button onClick={handleButtonClick} className="p-4 bg-blue-500 text-white rounded-md shadow-md">
                        Get a random movie
                    </button>
                )}
            </div>
        </>
    );
}

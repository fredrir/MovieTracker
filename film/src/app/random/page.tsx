"use client";
import FilmCard from "@/components/FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { GET } from "../api/movie-details/route";
import { MovieDetails } from "@/models/movieDetails";
import { useRouter } from "next/navigation";
import {render} from 'react-dom'
import { Button } from "@mui/material";

export default function RandomPage() {
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
        <h1>Random movie</h1>
            <Button onClick={handleButtonClick}>
                Get a random movie
            </Button>
        </>
    )
}

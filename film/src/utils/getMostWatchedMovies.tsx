import { GET } from "@/app/api/movie-details/route";
import { Movie } from "@/models/movie";


type UserData = {
    id: number;
}

export async function mostWatchedMovies(){
    return [];
}

async function getUsers(): Promise<UserData[]> {
    try {
        const users: UserData[] = [];

        return users;
    } catch {
        return [];
    }
}

function sixMostWatched() {
    
}
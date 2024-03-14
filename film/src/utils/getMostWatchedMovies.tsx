export async function mostWatchedMovies(): Promise<number[]> {
    const response = await fetch("/api/db/watched-most")
    const json = await response.json();
    return json.films;
}

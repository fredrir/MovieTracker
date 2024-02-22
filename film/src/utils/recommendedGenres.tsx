import { GET } from "@/app/api/movie-details/route";

type Genre = {
  id: number;
  name: string;
};
export async function getRecomendedGenres(userId: String): Promise<number[]> {
  try {
    const url = `/api/db/like-list?userid=${userId}`;
    const response = await fetch(url);
    const json = await response.json();
    const movies = await json.films;
    //Above working as intended
    let genreeee: number[] = [];
    for (let i = 0; i < movies.length; i++) {
      const genres = await getGenres(movies[i].toString());
      if (genres) {
        genreeee = genreeee.concat(genres);
      }
    }
    return findMostPopular(3, genreeee); //cast to number[]
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getGenres(movieId: String) {
  try {
    const url = `http://localhost:3000/api/movie-details?id=${movieId}`;
    const request = new Request(url);
    const response = await GET(request);
    const data = await response.json();
    const genres = data.data.genres.map((genre: Genre) => genre.id);
    return await genres;
  } catch (error) {
    console.log(error);
    return null;
  }
}
function findMostPopular(n: number, arr: number[]) {
  let retArr: number[] = [];
  let freqMap = new Map<number, number>();
  for (let i = 0; i < arr.length; i++) {
    freqMap.set(arr[i], (freqMap.get(arr[i]) || 0) + 1);
  }
  for (let i = 0; i < n; i++) {
    let max = 0;
    let maxKey = 0;
    freqMap.forEach((value, key) => {
      if (value > max) {
        max = value;
        maxKey = key;
      }
    });
    freqMap.delete(maxKey);
    retArr.push(maxKey);
  }
  return retArr;
}

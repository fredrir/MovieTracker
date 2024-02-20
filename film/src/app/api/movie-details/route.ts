export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "1";
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    console.log(url);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGM3NjVlOGEyYzFjZmU5OTUxN2JiNDdjM2U2Zjg4NCIsInN1YiI6IjY1YzIwMGFiOTU5MGUzMDE4MmIyNzJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VB2tWiR46PpfZrJa4lbcbTgYADSVjcAUjjjhTZkIOm8",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ 404: "error" });
  }
}

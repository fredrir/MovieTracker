import { GET } from "../app/api/movie-search/route";
import { describe, it, expect } from "vitest";

describe("Live GET API Endpoint Test", () => {
  it("should return a successful response from the live API", async () => {
    // Mock a request object
    // Call your GET function with the mocked request
    const url =
      "http://localhost:3000/api/get-trending-movies?page=1&query=Dune";
    const request = new Request(url);
    const response = await GET(request);
    const data = await response.json();
    // Basic assertion to check if the API call was successful
    expect(data.data).toHaveProperty("page", 1);
    expect(data.data).toHaveProperty("total_pages");
    expect(data.data).toHaveProperty("total_results");
    expect(data.data.results).toBeInstanceOf(Array);
    expect(data.data.results[0]).toHaveProperty("title", "Dune");
  });
});

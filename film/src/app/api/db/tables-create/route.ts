import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// the PAIN
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  try {
    const results = [
      await sql`
      CREATE TABLE folk (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255)
      );`,

      await sql`
      CREATE TABLE likes (
        folk_id VARCHAR(255),
        tmdb_id INT,
        PRIMARY KEY (folk_id, tmdb_id),
        FOREIGN KEY (folk_id) REFERENCES folk(id)
      );`,

      await sql`
      CREATE TABLE unlikes (
        folk_id VARCHAR(255),
        tmdb_id INT,
        PRIMARY KEY (folk_id, tmdb_id),
        FOREIGN KEY (folk_id) REFERENCES folk(id)
      );`,

      await sql`
      CREATE TABLE watched (
        folk_id VARCHAR(255),
        tmdb_id INT,
        PRIMARY KEY (folk_id, tmdb_id),
        FOREIGN KEY (folk_id) REFERENCES folk(id)
      );
      `,
    ];

    return NextResponse.json({ result: results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server"; 

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {

  try {
    const res =
      await sql`SELECT COUNT(folk_id) AS antall, tmdb_id FROM watched GROUP BY tmdb_id ORDER BY antall DESC LIMIT 6`;
    return NextResponse.json(
      { films: res.rows.map((x) => x.tmdb_id) },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

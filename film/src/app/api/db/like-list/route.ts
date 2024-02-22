import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userid = searchParams.get("userid");

  try {
    if (!userid) throw new Error("userid required");
    const res = await sql`SELECT tmdb_id FROM likes WHERE folk_id = ${userid}`;
    return NextResponse.json(
      { films: res.rows.map((x) => x.tmdb_id) },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

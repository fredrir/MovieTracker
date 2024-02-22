import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filmid = searchParams.get("filmid");
  const userid = searchParams.get("userid");

  try {
    if (!filmid) throw new Error("filmid required");
    if (!userid) throw new Error("userid required");

    const result =
      await sql`DELETE FROM watched WHERE folk_id = ${userid} AND tmdb_id = ${filmid};`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

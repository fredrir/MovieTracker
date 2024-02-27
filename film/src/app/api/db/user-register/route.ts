import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const id_str = searchParams.get("id");

  try {
    if (!name || !id_str) throw new Error("name and id required");
    const result = await sql`INSERT INTO folk (id, name) VALUES (${id_str}, ${name});`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

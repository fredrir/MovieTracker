import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  try {
    const res = await sql`SELECT name, id FROM folk`;
    return NextResponse.json(
      { people: res.rows.map((user) => ({ name: user.name, id: user.id })) },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

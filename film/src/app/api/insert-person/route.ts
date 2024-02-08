import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  try {
    if (!name) throw new Error("name required");
    await sql`INSERT INTO person (name) VALUES (${name});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const accs = await sql`SELECT * FROM person;`;
  return NextResponse.json({ pets: accs }, { status: 200 });
}

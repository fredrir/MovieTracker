import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  try {
    const result = await sql`
    SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
`;

    return NextResponse.json(
      { result: result.rows.map((x) => x.table_name) },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

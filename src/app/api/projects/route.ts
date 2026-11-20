
import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

export const dynamic = "force-dynamic";

// GET: Fetch all projects
export async function GET() {
  try {
    const projects = await sql`
      SELECT id, title, description
      FROM projects
      ORDER BY id DESC
    `;

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET error:", error);

    return NextResponse.json(
      { error: "Unable to fetch projects" },
      { status: 500 }
    );
  }
}

// POST: Add a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title =
      typeof body.title === "string" ? body.title.trim() : "";

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    if (title.length > 255 || description.length > 5000) {
      return NextResponse.json(
        { error: "Input is too long" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO projects (title, description)
      VALUES (${title}, ${description})
      RETURNING id, title, description
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST error:", error);

    return NextResponse.json(
      { error: "Unable to add project" },
      { status: 500 }
    );
  }
}

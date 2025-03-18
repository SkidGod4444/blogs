import { blogs } from "@/.velite";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filteredBlogs = blogs.map(({ shortenSlug, title, description, date, slugAsParams, cover, github }) => ({
      shortenSlug,
      title,
      description,
      date,
      slugAsParams,
      cover,
      github
    }));

    return NextResponse.json(filteredBlogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
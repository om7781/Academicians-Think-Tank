import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connect();
  const { _id } = await params;

  try {
    const blog = await Blog.findById(_id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

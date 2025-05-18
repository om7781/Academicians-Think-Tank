import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await connect();
    const blogs = await Blog.find();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

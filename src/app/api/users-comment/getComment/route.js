import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

await connect(); 

export async function POST(request) {
  try {
    const { _id } = await request.json(); // directly destructure
    const user = await Blog.findById(_id);
    const comments = user.comments
    return NextResponse.json(comments);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
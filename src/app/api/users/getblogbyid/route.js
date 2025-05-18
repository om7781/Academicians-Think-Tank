import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

await connect(); 

export async function POST(request) {
  try {
    const { _id } = await request.json();
    const user_id = _id 
    const user = await Blog.find({user_id});
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
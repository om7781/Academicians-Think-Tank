import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";

import { NextResponse } from "next/server";



await connect();

export async function PATCH(request){
    try {
        const reqBody = await request.json();
        const commentData  = reqBody
        const {blogid, content, username} = commentData
        const updatedBlog = await Blog.findByIdAndUpdate(blogid, {
        $push: {
          comments: {
            username : username,
            comment : content,
            timestamp: new Date(),
          },
        },
      },
      { new: true })
      return NextResponse.json(updatedBlog)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

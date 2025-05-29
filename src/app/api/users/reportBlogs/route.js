import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";


export async function POST(request) {
    try {
        await connect();
        const reqbody = await request.json();
        const { username, comment, blogid } = reqbody;
        const blog = await Blog.findByIdAndUpdate(blogid,
            {$push: {
          reports : {
            username : username,
            comment : comment,
          }
        }}
        )
        const savedBlog = await blog.save();
        return NextResponse.json({success:true,blog:savedBlog})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { _id } = reqBody;
        // const deletedBlog = await Blog.findOneAndDelete({_id})
        return NextResponse.json({id: _id})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}

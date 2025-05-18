import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import axios from "axios";

import { NextResponse } from "next/server";

await connect();


export async function POST(request) {
    try {
        const reqbody = await request.json()
        const {title,content,comments,likesCount,upload_date,user_id,username} = reqbody
        const newBlog = new Blog({title,content,comments,likesCount,upload_date,user_id,username})
        await newBlog.save()
        return NextResponse.json({message:"Blog added Successfully."});
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message}, {status:500})
    }
}
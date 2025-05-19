import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await connect();
        const reqBody = await request.json();
        const { _id , username} = reqBody;
        const blogdata = await Blog.findOne({_id});
        if(blogdata.likesCount.includes(username)){
            blogdata.likesCount.remove(username)
            await blogdata.save();
            return NextResponse.json({ message: "Like Removed!.",count:blogdata.likesCount.length});
        } else{
            blogdata.likesCount.push(username)
            await blogdata.save();
            return NextResponse.json({message:"Success!",count:blogdata.likesCount.length})
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message}, {status:500})
    }
}
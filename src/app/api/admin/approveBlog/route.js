import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function PATCH(request){
    try {
        await connect();
        const reqBody = await request.json();
        const {_id} = reqBody;
        const approvedBlog = await Blog.findByIdAndUpdate({_id},
            { $set: { isApproved: true } },  
            { new: true } )
        await approvedBlog.save()
        return NextResponse.json({success:true,response:approvedBlog})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
import { connect } from "@/dbConfig/dbConfig";
import Comment from "@/models/commentModel";
import { NextResponse } from "next/server";



await connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const { commentData } = reqBody
        const newComment = new Comment({ commentData: commentData });
        await newComment.save()
        return NextResponse.json({message:"Comment added Successfully."});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

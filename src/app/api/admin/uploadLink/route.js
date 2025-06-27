import Admin from "@/models/admin";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connect();
        const reqBody = await request.json();
        const { links } = reqBody;
        const replaced = await Admin.findOneAndUpdate(
      {},                  
      { link: links },     
      { upsert: true, new: true } 
    );
        await replaced.save();
        return NextResponse.json({success:true})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
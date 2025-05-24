import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse } from "next/server";


export async function GET(request){
    try {
        await connect();
        const users = await User.find();
        return NextResponse.json({users})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getUserInfo";
import { NextResponse } from "next/server";

connect();


export async function GET(request) {
    try {
        const userId = await getTokenData(request)
        const user = await User.findById(userId).select('-password')
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
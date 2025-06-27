import Admin from "@/models/admin";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";


export async function GET(params) {
    try {
        await connect();
        const response = await Admin.find();
        return NextResponse.json({response})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
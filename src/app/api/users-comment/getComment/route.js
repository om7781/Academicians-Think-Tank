import { connect } from "@/dbConfig/dbConfig";
import Comment from "@/models/commentModel";
import { NextResponse } from "next/server";



await connect();

export async function GET(request){
    // const response = 
}
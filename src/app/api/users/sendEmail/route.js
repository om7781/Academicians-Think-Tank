import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
    await connect();
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token)
    const user = await User.findOne({
        verifyToken:token,
        verifyTokenExpiry: {$gt : Date.now()}
    })
    console.log("user:" , user)
    if(!user){
        return NextResponse.json({error:"User not Found!"},{status:404})
    }
    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()
    return NextResponse.json({message:"User Verification Successful!"})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({error:error.message},{status:500})
    }
}
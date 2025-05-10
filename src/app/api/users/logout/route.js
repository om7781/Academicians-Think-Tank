import { NextRequest, NextResponse } from "next/server"


export async function GET(params) {
    try {
        const response = NextResponse.json({
            message: 'Logout Successful',
            success: true,
        });
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        console.log("Logout Success!")
        return response;
    } catch (error) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // use jwt, not JsonWebTokenError

connect();

export async function POST(request) {
    try {

        const reqBody = await request.json(); // ✅ await
        const { email, password } = reqBody;
        // console.log(email,password)
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 404 }); // ✅ return
            // console.log(user, "does not exits")
        }

        // const validPassword = await bcrypt.compare(password, user.password);
        // if (!validPassword) {
        //     return NextResponse.json({ error: "Password is incorrect!" }, { status: 400 }); // ✅ return
        // }

        // const tokenData = {
        //     id: user._id,
        //     username: user.userName,
        //     email: user.email,
        // };

        // const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' }); // ✅ use jwt

        // const response = NextResponse.json({
        //     message: 'Login Successful',
        //     success: true,
        // });

        // response.cookies.set('token', token, {
        //     httpOnly: true,
        // });
        console.log("Login Success!")
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}

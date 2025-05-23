import { connect } from "@/dbConfig/dbConfig";
import axios from "axios";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModels";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connect();
    const reqBody = await request.json();
    const { email, pass } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Does NOT Exist!" },
        { status: 403 }
      );
    }
    const validatePass = await bcrypt.compare(pass, user.password);
    if (!validatePass) {
      return NextResponse.json(
        { error: "Password Entered is Incorrect!" },
        { status: 400 }
      );
    }
    const isAdmin = user.isAdmin;
    if (!isAdmin) {
      return NextResponse.json(
        { error: "You are NOT an ADMIN!" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.userName,
      email: user.email,
      isAdmin: user.isAdmin

    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({message: 'Login Successful',
            success: true,});
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

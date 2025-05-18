import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 403 });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return NextResponse.json({ authenticated: true, user: decoded }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 401 });
  }
}

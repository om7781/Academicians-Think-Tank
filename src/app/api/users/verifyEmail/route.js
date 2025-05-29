import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, userId } = reqBody;
    sendEmail({ email, emailtype: "VERIFY", userId });
    return NextResponse.json({ message: "Email Sent Successfully!" });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

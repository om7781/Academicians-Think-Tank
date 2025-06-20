import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, userId } = reqBody;
    const response = await sendEmail({ email, emailtype: "VERIFY", userId });
    if(response.status===400){
      console.log("Email failed!!")
      return NextResponse.json({message:"Try again Later",success:false})
    }
    return NextResponse.json({ message: "Email Sent Successfully!", success: true});
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

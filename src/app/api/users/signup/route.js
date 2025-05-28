import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { sendEmail } from '@/helpers/mailer';



await connect();



export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {fullName, userName, email , password} = reqBody;

        const userExists = await User.findOne({email});
        if(userExists){
           return NextResponse.json({error:"User already Exists!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt)


        const NewUser = new User({ fullName, userName, email, password: hashedPass });
        await NewUser.save();

        await sendEmail({email,emailtype: "VERIFY", userId: NewUser._id})
        return NextResponse.json({message:"User successfully created"});

    } catch (error) {
        console.log("There was an error Creating user: ",error);
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}

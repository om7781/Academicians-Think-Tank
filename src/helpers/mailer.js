import bcrypt from "bcrypt";
import User from "@/models/userModels";
import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, emailtype, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.MAILERUSER,
        pass: process.env.MAILERPASS,
      },
    });

    const mailOptions = {
      from: "omlakade8@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/Verify?token=${hashedToken}">here</a> to ${
        emailtype === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      }</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    return console.log(error);
  }
};

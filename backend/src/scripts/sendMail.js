import nodemailer from "nodemailer";
import transporter from "../config/mailer.js";
import dotenv from 'dotenv'
dotenv.config();

const sendTestEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: "test@example.com",
            subject: "smtp sprintly test",
            text: "heyy folks smtp check",
        });
        console.log(info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log("something went wrong", error.message);
        process.exitCode = 1;
    }
};
sendTestEmail();


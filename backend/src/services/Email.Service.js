import transporter from "../config/mailer.js";

export const sendVerificationEmail = async (email, rawToken) => {
    const verificationUrl =
        `${process.env.APP_URL}/verify-email?token=${encodeURIComponent(rawToken)}`;

    const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Verify your Sprintly account",
        text: `Welcome to Sprintly!

Please verify your email address by clicking the link below:

${verificationUrl}

This verification link expires in 2 hours.

If you did not create a Sprintly account, please ignore this email.`
    });

    return info;
};
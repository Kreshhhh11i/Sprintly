import transporter from "../config/mailer.js";


const testConnection = async () => {
    try {
        const connectionCheck = await transporter.verify();
        if (connectionCheck) {
            console.log("mail server is connected");

        }
    }
    catch (error) {
        console.error("SMTP connection failed:", error.message);
        process.exitCode = 1;

    }
};

testConnection();
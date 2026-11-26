import { registerSchema } from "../validators/auth.schema.js";
import {
    findUserByEmail,
    createUserRegistration
} from "../repositories/User.repo.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword } from "../utils/hash.js";
import { generateRandomToken, hashToken } from "./Token.Service.js";
import { sendVerificationEmail } from "./Email.Service.js";

export const registerUserService = async (input) => {

    const result = registerSchema.safeParse(input);
    if (!result.success) {
        throw new ApiError(400, "Invalid registration details");

    }

    const { name, email, password } = result.data;

    const userCheck = await findUserByEmail(email);
    if (userCheck) {
        throw new ApiError(409, "Email already registered");
    }

    const passwordHash = await hashPassword(password);
    const rawToken = generateRandomToken();
    const verificationTokenHash = hashToken(rawToken);
    const verificationExpiresAt = new Date(
        Date.now() + 2 * 60 * 60 * 1000
    );

    let newUser;

    try {
        newUser = await createUserRegistration({
            name,
            email,
            passwordHash,
            verificationTokenHash,
            verificationExpiresAt
        });

    } catch (error) {
        if (
            error.code === "23505" &&
            error.constraint === "users_email_lower_unique"
        ) {
            throw new ApiError(409, "Email already registered");
        }

        throw error;
    }

    let emailSent = false;
    try {
        
        await sendVerificationEmail(email, rawToken);
        emailSent = true;

    } catch (error) {
        console.log("Account created but failed to send email verification link");

    }
    return {
        id: newUser.id,
        emailSent,
        message: emailSent
            ? "Registration successful. Please verify your email."
            : "Account created, but verification email could not be sent."
    };
};
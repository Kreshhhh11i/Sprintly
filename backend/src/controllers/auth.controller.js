
import { registerUserService } from "../services/Auth.Service.js";

export const registerUserController = async (req, res) => {
    const result = await registerUserService(req.body);
    return res.status(201).json({
        success: true,
        message: result.message,
        data: {
            id: result.id,
            emailSent: result.emailSent
        }
    })

};
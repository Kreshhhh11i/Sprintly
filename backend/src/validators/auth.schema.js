import { z } from "zod";

export const registerSchema = z.object({

    name: z.string().trim().min(1, "Name should be atleast one character").max(50, "Name should not exceed more then 50 characters"),
    email: z.string()
        .trim()
        .toLowerCase()
        .pipe(z.email()),
    password: z.string().min(8, "Password must be atleast 8 characters long").max(72, "Password must not exceed 72 characters"),
}).refine(
    (data) => data.password.toLowerCase() !== data.email,
    {
        message: "Password must not be the same as email",
        path: ["password"]
    }
);

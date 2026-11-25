import { registerSchema } from "../validators/auth.schema.js";

const user1 = {
    name: "Alex",
    email: "ALEX@GMAIL.COM",
    password: "SecurePass123"
};

const user2 = {
    name: "Alex",
    email: "alex@gmail.com",
    password: "alex@gmail.com"
};

const user3 = {
    name: "",
    email: "wrong-email",
    password: "123"
};

const result = registerSchema.safeParse(user3);

console.log(result.success);
console.log(result.success ? result.data : result.error.issues);
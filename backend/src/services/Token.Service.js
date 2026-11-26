import { randomBytes, createHash } from "node:crypto";


export const generateRandomToken = () => {
    const token = randomBytes(32).toString('hex');
    return token;
}
export const hashToken = (token) => {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    return tokenHash;
}

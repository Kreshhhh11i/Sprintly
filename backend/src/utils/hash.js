import bcrypt from "bcrypt";


export const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
}

export const comparePassword = async (enteredPassword, storedPasswordHash) => {
    const isMatch = await bcrypt.compare(enteredPassword, storedPasswordHash);
    return isMatch;
};


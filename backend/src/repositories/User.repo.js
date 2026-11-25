import pool from "../config/db.js";



export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT id FROM users WHERE LOWER(email) = LOWER($1)`,
        [email]
    );

    return result.rows[0];
};

export const createUserRegistration = async ({
    name,
    email,
    passwordHash,
    verificationTokenHash,
    verificationExpiresAt
}) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // INSERT 1: Create user
        const result = await client.query(
            `INSERT INTO users
            (name, email, password_hash, account_status)
            VALUES ($1, $2, $3, 'pending')
            RETURNING id`,
            [name, email, passwordHash]
        );

        const userId = result.rows[0].id;

        await client.query(
            `INSERT INTO profiles (user_id) VALUES ($1)`,
            [userId]
        );

        await client.query(
            `INSERT INTO user_preferences (user_id) VALUES ($1)`,
            [userId]);

        await client.query(`INSERT INTO auth_tokens (user_id,token_hash,token_type, expires_at) VALUES ($1,$2,$3,$4)`, [userId, verificationTokenHash, "email_verification", verificationExpiresAt]);

        await client.query("COMMIT");
        return { id: userId };

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } finally {
        client.release();
    }
};
import pool from "../config/db.js";

export const activateUserByVerificationToken = async (tokenHash) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const result = await client.query(`UPDATE auth_tokens SET used_at = NOW() WHERE token_hash = $1 AND token_type = 'email_verification' AND used_at IS NULL AND expires_at >NOW() RETURNING user_id`, [tokenHash]);
        if (result.rowCount === 0) {
            await client.query("ROLLBACK");
            return null;
        }
        const userId = result.rows[0].user_id;
        const userResult = await client.query(`UPDATE users SET account_status = 'active' WHERE id = $1 AND account_status = 'pending' RETURNING id;`, [userId]);
        if(userResult.rowCount===0){
            await client.query("ROLLBACK");
            return null;
        }
        
        await client.query("COMMIT");
        return userId;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } finally {
        client.release();
    }
};
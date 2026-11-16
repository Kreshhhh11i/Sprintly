import pool from "../config/db.js";

export const createProject = async (name, description, ownerId) => {
    const result = await pool.query(`INSERT INTO projects (name,description , owner_id ) VALUES ($1,$2,$3) RETURNING *`, [name, description, ownerId]);
    return result.rows[0];
}

export const findProjectById = async (projectId, ownerId) => {
    const result = await pool.query(`SELECT * FROM projects WHERE id = $1 AND owner_id = $2 AND team_id IS NULL`, [projectId, ownerId]);
    return result.rows[0];
}

export const listByOwner = async (ownerId) => {
    const result = await pool.query(`SELECT * FROM projects WHERE owner_id = $1 AND team_id IS NULL`, [ownerId]);
    return result.rows;
}

export const updateProject = async (projectId, ownerId, name, description) => {
    const result = await pool.query(
        `UPDATE projects SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id = $3 AND owner_id = $4 AND team_id IS NULL RETURNING *`, [name, description, projectId, ownerId]);
    return result.rows[0];
};

export const deleteProject = async (projectId, ownerId) => {
    const result = await pool.query(`DELETE FROM projects WHERE id = $1 AND owner_id = $2 AND team_id IS NULL RETURNING *`, [projectId, ownerId]);
    return result.rows[0];
};
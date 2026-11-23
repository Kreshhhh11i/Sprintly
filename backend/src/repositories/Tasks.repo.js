import pool from "../config/db.js";



export const createTask = async (
    projectId,
    createdBy,
    title,
    description
) => {
    const result = await pool.query(`INSERT INTO tasks(project_id,created_by,title,description) values($1,$2,$3,$4) RETURNING *`, [projectId, createdBy, title, description]);
    return result.rows[0];
};
export const getTaskById = async (projectId, taskId) => {
    const result = await pool.query(`SELECT * FROM tasks WHERE project_id = $1 AND id = $2`, [projectId, taskId]);
    return result.rows[0];
}

export const listTasksByProject = async (projectId) => {
    const result = await pool.query(`SELECT * FROM tasks WHERE project_id = $1`, [projectId]);
    return result.rows;
};

export const updateTask = async (
    projectId,
    taskId,
    title,
    description,
    status,
    priority,
    dueDate
) => {
    const result = await pool.query(`UPDATE tasks
SET
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    status = COALESCE($3, status),
    priority = COALESCE($4, priority),
    due_date = COALESCE($5, due_date),
    updated_at = NOW()
WHERE
    id = $6
    AND project_id = $7
RETURNING *;`,[title,description,status,priority,dueDate,taskId,projectId])
    return result.rows[0]
};



export const deleteTask = async (projectId, taskId) => {
    const result = await pool.query(`DELETE FROM tasks WHERE project_id = $1 AND id = $2 RETURNING *`, [projectId, taskId]);
    return result.rows[0];
};
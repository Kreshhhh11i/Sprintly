import { findProjectById } from "../repositories/Project.repo.js";
import { createTask, deleteTask, getTaskById, listTasksByProject, updateTask } from "../repositories/Tasks.repo.js";
import ApiError from "../utils/ApiError.js";

export const createTaskService = async (projectId, createdBy, title, description) => {
    if (typeof title !== "string" || title.trim() === "") {
        throw new ApiError(400, "Task title is required");
    }
    if (description !== undefined && typeof description !== "string") {
        throw new ApiError(400, "Task description must be a string");
    }
    const project = await findProjectById(projectId, createdBy);
    if (!project) {
        throw new ApiError(404, "Project not found ");
    }
    const task = await createTask(projectId, createdBy, title, description);
    return task;
}

export const getTaskByIdService = async (projectId, taskId, createdBy) => {
    const project = await findProjectById(projectId, createdBy);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }
    const task = await getTaskById(projectId, taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    return task;
}

export const listTasksByProjectService = async (projectId, createdBy) => {

    const project = await findProjectById(projectId, createdBy)
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const tasks = await listTasksByProject(projectId);
    return tasks;
};

export const updateTaskService = async (
    projectId,
    taskId,
    createdBy,
    title,
    description,
    status,
    priority,
    dueDate
) => {
    const allowedStatus = ["todo", "in_progress", "done"];
    const allowedPriorities = ["low", "medium", "high"];

    // 1. Check project ownership
    const project = await findProjectById(projectId, createdBy);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // 2. Check if at least one field was provided
    if (
        title === undefined &&
        description === undefined &&
        status === undefined &&
        priority === undefined &&
        dueDate === undefined
    ) {
        throw new ApiError(400, "Provide at least one field");
    }

    // 3. Validate title
    if (
        title !== undefined &&
        (typeof title !== "string" || title.trim() === "")
    ) {
        throw new ApiError(400, "Task title is required");
    }

    // 4. Validate description
    if (description !== undefined && typeof description !== "string") {
        throw new ApiError(400, "Task description must be a string");
    }

    // 5. Validate status
    if (status !== undefined && !allowedStatus.includes(status)) {
        throw new ApiError(400, "Invalid task status");
    }

    // 6. Validate priority
    if (priority !== undefined && !allowedPriorities.includes(priority)) {
        throw new ApiError(400, "Invalid task priority");
    }

    // Validate due date only when provided and not null
    if (dueDate !== undefined && dueDate !== null) {
        // 1. Check if it's a string
        if (typeof dueDate !== "string") {
            throw new ApiError(400, "Due date must be a string");
        }

        // 2. Check YYYY-MM-DD format
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!datePattern.test(dueDate)) {
            throw new ApiError(400, "Due date must be in YYYY-MM-DD format");
        }

        // 3. Convert the string into a Date object
        const date = new Date(`${dueDate}T00:00:00Z`);

        // 4. Check whether the date actually exists
        if (
            Number.isNaN(date.getTime()) ||
            date.toISOString().slice(0, 10) !== dueDate
        ) {
            throw new ApiError(400, "Invalid due date");
        }
    }

    // 7. Update task using repository
    const updatedTask = await updateTask(
        projectId,
        taskId,
        title,
        description,
        status,
        priority,
        dueDate
    );

    // 8. Check whether the task exists
    if (!updatedTask) {
        throw new ApiError(404, "Task not found");
    }

    // 9. Return updated task
    return updatedTask;
};


export const deleteTaskService = async (projectId, taskId, createdBy) => {

    const project = await findProjectById(projectId, createdBy);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }
    const taskDelete = await deleteTask(projectId, taskId);
    if (!taskDelete) {
        throw new ApiError(404, "Task not found");
    }
    return taskDelete;

};
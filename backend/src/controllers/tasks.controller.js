import * as taskService from "../services/Tasks.Services.js"

export const createTaskController = async (req, res) => {
    const projectId = req.params.projectId;
    const createdBy = req.user.id
    const { title, description } = req.body;
    const result = await taskService.createTaskService(projectId, createdBy, title, description);
    return res.status(201).json({
        success: true,
        message: "Task created",
        data: result,
    });
};
export const getTaskbyIdController = async (req, res) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const createdBy = req.user.id
    const result = await taskService.getTaskByIdService(projectId, taskId, createdBy);
    return res.status(200).json({
        success: true,
        message: "Task Found",
        data: result,
    });
};

export const listTasksByProjectController = async (req, res) => {
    const projectId = req.params.projectId;
    const createdBy = req.user.id
    const result = await taskService.listTasksByProjectService(projectId, createdBy)
    return res.status(200).json({
        success: true,
        data: result,
    });
};

export const updateTaskController = async (req, res) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const createdBy = req.user.id;
    const { title, description, status, priority, dueDate } = req.body;
    const result = await taskService.updateTaskService(projectId, taskId, createdBy, title, description, status, priority, dueDate);
    return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: result
    });
};

export const deleteTaskController = async(req,res)=>{
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const createdBy = req.user.id;
    const result = await taskService.deleteTaskService(projectId,taskId,createdBy);
    return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: result
    });
}
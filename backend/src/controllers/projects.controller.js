import * as projectService from "../services/ProjectService.js";

export const createProjectController = async (req, res) => {
    const { name, description } = req.body;
    const owenerId = req.user.id;
    const result = await projectService.createProjectService(name, description, owenerId);
    return res.status(201).json({
        success: true,
        message: "Project created",
        data: result,
    });

};
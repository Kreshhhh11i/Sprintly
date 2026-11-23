import * as projectService from "../services/Project.Service.js";

export const createProjectController = async (req, res) => {
    const { name, description } = req.body;
    const ownerId = req.user.id;
    const result = await projectService.createProjectService(name, description, ownerId);
    return res.status(201).json({
        success: true,
        message: "Project created",
        data: result,
    });

};


export const getProjectByIdController = async (req, res) => {
    const projectId = req.params.id;
    const ownerId = req.user.id;
    const result = await projectService.getProjectByIdService(projectId, ownerId)
    return res.status(200).json({
        success: true,
        data: result,
    })
};

export const listProjectsController = async (req, res) => {
    const ownerId = req.user.id;
    const result = await projectService.listProjectsService(ownerId);
    return res.status(200).json({
        success: true,
        data: result,
    })

};

export const updateProjectController = async (req, res) => {

    const projectId = req.params.id;
    const ownerId = req.user.id;
    const { name, description } = req.body;
    const result = await projectService.updateProjectService(projectId, ownerId, name, description);
    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: result,
    })
};

export const deleteProjectController = async (req, res) => {
    const projectId = req.params.id;
    const ownerId = req.user.id;
    const result = await projectService.deleteProjectService(projectId, ownerId);
    return res.status(200).json({
        success: true,
        data: result,
    })

};
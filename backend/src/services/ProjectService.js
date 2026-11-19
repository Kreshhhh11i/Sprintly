import ApiError from "../utils/ApiError.js";
import { createProject, findProjectById ,deleteProject, listByOwner, updateProject } from "../repositories/Project.repo.js";

export const createProjectService = async (name, description, ownerId) => {
    if (typeof name !== "string" || name.trim() === "") {
        throw new ApiError(400, "Project name is required");
    }

    const project = await createProject(name, description, ownerId);

    return project;
};


export const getProjectByIdService = async (projectId, ownerId) => {
    const project = await findProjectById(projectId, ownerId);
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    return project;

};

export const listProjectsService = async (ownerId) => {
    const projects = await listByOwner(ownerId)
    return projects;
};

export const updateProjectService = async (projectId, ownerId, name, description) => {
    if (name === undefined && description === undefined) {
        throw new ApiError(400, "No fields provided to update");
    }
    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
        throw new ApiError(400, "Project name is required");
    }
    if (description !== undefined && typeof description !== "string") {
        throw new ApiError(400, "Project description must be a string");
    }

    const updateProj = await updateProject(projectId, ownerId, name, description);
    if (!updateProj) {
        throw new ApiError(404, "Project not found")
    }
    return updateProj;


};

export const deleteProjectService = async (projectId, ownerId) => {
    const deletedProject = await deleteProject(projectId, ownerId);
    if (!deletedProject) {
        throw new ApiError(404, "Project not found")
    }
    return deleteProject;


};
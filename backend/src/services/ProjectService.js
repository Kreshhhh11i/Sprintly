import ApiError from "../utils/ApiError.js";
import { createProject, findProjectById } from "../repositories/projects.repo.js";

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


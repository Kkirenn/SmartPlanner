import { api } from "./client";
import type { Task } from "../types/Tasks";

export const assignTaskToDeveloper = async (taskId: string, devId: string): Promise<void> => {
    await api.post(`/assignment/${taskId}/assign/${devId}`);
};

export const getTasksByDeveloper = async (devId: string): Promise<Task[]> => {
    const response = await api.get(`/assignment/developer/${devId}`);
    return response.data;
};

export const getUnassignedTasks = async (): Promise<Task[]> => {
    const response = await api.get("/assignment/unassigned");
    return response.data;
};
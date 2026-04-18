import { api } from "./client";

export const getTasks = async () => {
    const res = await api.get("/tasks");
    return res.data;
};

export const createTask = async (data: { title: string; storyPoints: number }) =>
{
    const res = await api.post("/tasks", data);
    return res.data;
};
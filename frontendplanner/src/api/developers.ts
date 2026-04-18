import { api } from "./client";

export interface Developer {
    id: string;
    name: string;
    email: string;
    role: number;
}

export const getDevelopers = async (): Promise<Developer[]> => {
    const response = await api.get("/developers");
    return response.data;
};

export const createDeveloper = async (name: string, email: string, password: string): Promise<Developer> => {
    const res = await api.post("/developers", {
        name: name,
        email: email,
        password: password,
        role: 0
    });
    return res.data;
};

export const getDeveloperById = async (id: string): Promise<Developer> => {
    const response = await api.get(`/developers/${id}`);
    return response.data;
};
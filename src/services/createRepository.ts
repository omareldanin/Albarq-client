import { api } from "@/api";
import { createRepositoryEndpoint } from "@/api/apisUrl";

export interface CreateRepositoryPayload {
    name: string;
    branchID: number;
}

export const createRepositoryService = async (data: CreateRepositoryPayload) => {
    const response = await api.post<CreateRepositoryPayload>(createRepositoryEndpoint, data);
    return response.data;
};

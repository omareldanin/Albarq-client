import { api } from "@/api";
import { createEmployeeEndpoint } from "@/api/apisUrl";
import type { permissionsArabicNames } from "@/lib/persmissionArabicNames";
import type { rolesArabicNames } from "@/lib/rolesArabicNames";

export interface CreateEmployeePayload {
    username: string;
    name: string;
    password: string;
    phone: string;
    salary: number;
    repositoryID: number;
    branchID: number;
    role: keyof typeof rolesArabicNames;
    permissions: keyof (typeof permissionsArabicNames)[];
}

export const createEmployeeService = async (data: FormData) => {
    const response = await api.post<FormData>(createEmployeeEndpoint, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

import { api } from "@/api";
import { getStoresEndpoint } from "@/api/apisUrl";
import type { Filters } from "./getEmployeesService";

export interface Store {
    id: number;
    name: string;
    notes: string;
    logo: string;
    client: {
        id: number;
        name: string;
    };
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: {
        id: number;
        name: string;
    };
    clientAssistant: {
        id: number;
        name: string;
    } | null;
}

export interface GetStoresResponse {
    status: string;
    page: number;
    pagesCount: number;
    data: Store[];
}

export const getStoresService = async (
    { page = 1, size = 10, deleted = false, minified }: Filters = {
        page: 1,
        size: 10
    }
) => {
    const response = await api.get<GetStoresResponse>(getStoresEndpoint, {
        params: {
            page,
            size,
            deleted,
            minified
        }
    });
    return response.data;
};

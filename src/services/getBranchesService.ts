import { api } from "@/api";
import { getBranchesEndpoint } from "@/api/apisUrl";
import type { governorateArabicNames } from "@/lib/governorateArabicNames ";
import type { Filters } from "./getEmployeesService";

export interface Branch {
    id: number;
    name: string;
    governorate: keyof typeof governorateArabicNames;
    company: {
        id: number;
        name: string;
    };
}

export interface GetRepositoriesResponse {
    status: string;
    page: number;
    pagesCount: number;
    data: Branch[];
}

export interface BranchFilters extends Filters {
    governorate?: keyof typeof governorateArabicNames;
    location_id?: number;
}

export const getBranchesService = async (
    { page = 1, size = 10, governorate, location_id, minified }: BranchFilters = {
        page: 1,
        size: 10
    }
) => {
    const response = await api.get<GetRepositoriesResponse>(getBranchesEndpoint, {
        params: {
            page,
            size,
            governorate: governorate || undefined,
            location_id: location_id || undefined,
            minified: minified || undefined
        }
    });
    return response.data;
};

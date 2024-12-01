import { api } from "@/api";
import { refreshTokensEndpoint } from "@/api/apisUrl";
import type { AxiosResponse } from "axios";

interface RefreshTokenResponse {
    status: string;
    token: string;
}

export const refreshTokenService = async (refreshToken: string) => {
    const response = await api.post<{ refreshToken: string }, AxiosResponse<RefreshTokenResponse>>(
        refreshTokensEndpoint,
        { refreshToken }
    );
    return response.data;
};

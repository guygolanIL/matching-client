import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

import * as asyncStorage from '../util/async-storage';
import { ApiErrorResponse, ApiResponse } from './types';


export type RefreshRequest = {
    refreshToken: string;
};
type RefreshResponse = ApiResponse<{
    accessToken: string;
    refreshToken: string;
}>;
export async function refresh(payload: RefreshRequest): Promise<RefreshResponse> {
    const res = await httpClient.post<RefreshResponse>('/auth/refresh', payload);

    return res.data;
}

export const httpClient = axios.create({
    baseURL: Constants.expoConfig?.extra?.apiUrl,
});

async function tokenInterceptor(config: AxiosRequestConfig) {
    const userToken = await asyncStorage.getItem('@user-token');
    config.headers = { ...config.headers, 'Authorization': `Bearer ${userToken}` }
    return config;
}

httpClient.interceptors.request.use(tokenInterceptor);


httpClient.interceptors.response.use(
    (res) => res,
    async (err: AxiosError<ApiErrorResponse>) => {
        const originalRequest = err.config;
        console.log(err);
        const errorMessage = err.response?.data?.issues[0].message;

        if (errorMessage === "Jwt expired" && !(originalRequest as any)._retried) {
            (originalRequest as any)._retried = true

            const refreshToken = await asyncStorage.getItem('@refresh-token');

            if (!refreshToken) return

            const response: RefreshResponse = await refresh({
                refreshToken
            });

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.result;

            await asyncStorage.setItem('@refresh-token', newRefreshToken);
            await asyncStorage.setItem('@user-token', newAccessToken);

            return httpClient(originalRequest);
        }

        return Promise.reject(err);
    }
);

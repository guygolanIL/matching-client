import { httpClient } from '../http-client';
import { ApiResponse } from '../types';
import { LocalAuthPayload } from './types';

export type RegisterRequestPayload = LocalAuthPayload;
export type RegisterResponse = ApiResponse<{ id: number }>;
export async function register(payload: LocalAuthPayload): Promise<RegisterResponse> {
    const url = '/user/register/password';
    const res = await httpClient.post<RegisterResponse>(url, payload);

    return res.data
}

export type LoginResponse = ApiResponse<{ accessToken: string; refreshToken: string }>;
export type LoginRequestPayload = LocalAuthPayload & { longitude: number; latitude: number };
export async function login(payload: LoginRequestPayload): Promise<LoginResponse> {
    const url = '/user/login/password';
    const res = await httpClient.post<LoginResponse>(url, payload);

    return res.data;
}

export type LogoutResponse = ApiResponse<{}>;
export async function logout() {
    const url = '/user/logout';
    const res = await httpClient.post<LogoutResponse>(url);

    return res.data;
}

type FeedResponse = ApiResponse<Array<{ id: number; email: string; distance: number }>>;
export async function feed() {
    const url = "/user/feed";
    const res = await httpClient.get<FeedResponse>(url);

    return res.data;
}
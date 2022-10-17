import { httpClient } from "../http-client";
import { ApiResponse } from "../types";

type Position = {
    longitude: number;
    latitude: number;
};

export type LocalAuthPayload = {
    email: string;
    password: string;
};

export type RegisterRequestPayload = LocalAuthPayload & {
    confirmPassword: string;
};
export type RegisterResponse = ApiResponse<{ id: number }>;
export async function register(payload: RegisterRequestPayload): Promise<RegisterResponse> {
    const url = '/auth/register/password';
    const res = await httpClient.post<RegisterResponse>(url, payload);

    return res.data
}

export type LoginResponse = ApiResponse<{ accessToken: string; refreshToken: string }>;
export type LoginRequestPayload = LocalAuthPayload & Position;
export async function login(payload: LoginRequestPayload): Promise<LoginResponse> {
    const url = '/auth/login/password';
    const res = await httpClient.post<LoginResponse>(url, payload);

    return res.data;
}

type GoogleAuthPayload = {
    googleAccessToken: string;
};
export type GoogleLoginRequestPayload = GoogleAuthPayload & Position;
export async function loginWithGoogle(payload: GoogleLoginRequestPayload): Promise<LoginResponse> {
    const url = '/auth/login/google';
    const res = await httpClient.post(url, payload);

    return res.data;
}

export type LogoutResponse = ApiResponse<{}>;
export async function logout() {
    const url = '/auth/logout';
    const res = await httpClient.delete<LogoutResponse>(url);

    return res.data;
}
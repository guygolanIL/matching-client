import { httpClient } from '../http-client';
import { ApiResponse } from '../types';
import { LocalAuthPayload } from './types';

export type RegisterRequestPayload = LocalAuthPayload;
type AuthResponse = ApiResponse<{ message: string }>;
export async function register(payload: LocalAuthPayload): Promise<AuthResponse> {
    const url = '/user/register/password';
    const res = await httpClient.post<AuthResponse>(url, payload);

    return res.data
}

export type LoginRequestPayload = LocalAuthPayload & { longitude: number; latitude: number };
export async function login(payload: LoginRequestPayload): Promise<AuthResponse> {
    const url = '/user/login/password';
    const res = await httpClient.post<AuthResponse>(url, payload);
    console.log(res);
    return res.data;
}
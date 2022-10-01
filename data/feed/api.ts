import { httpClient } from '../http-client';
import { ApiResponse } from '../types';

type FeedResponse = ApiResponse<Array<{ id: number; email: string; distance: number }>>;
export async function feed() {
    const url = "/feed";
    const res = await httpClient.get<FeedResponse>(url);

    return res.data;
}
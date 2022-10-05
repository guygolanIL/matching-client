import { httpClient } from '../http-client';
import { ApiResponse } from '../types';

type PublicProfileInfo = {
    userId: number;
    profileImgUri: string;
}

type FeedResponse = ApiResponse<Array<PublicProfileInfo>>;
export async function feed() {
    const url = "/feed";
    const res = await httpClient.get<FeedResponse>(url);

    return res.data;
}
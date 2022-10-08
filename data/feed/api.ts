import { httpClient } from '../http-client';
import { ApiResponse } from '../types';

export type PublicProfileInfo = {
    userId: number;
    profileImgUri: string;
}

export type FeedResponse = ApiResponse<Array<PublicProfileInfo>>;
export async function feed() {
    const url = "/feed";
    const res = await httpClient.get<FeedResponse>(url);

    return res.data.result;
}

export type Attitude = "POSITIVE" | 'NEGATIVE';

type ClassifyResponse = ApiResponse<{
    attitude: Attitude
    classifierUserId: number
    classifiedUserId: number
}>;
type ClassifyRequest = {
    attitude: Attitude;
    classifiedUserId: number;
};
export async function classify(payload: ClassifyRequest) {
    const url = "/feed/classify";
    const res = await httpClient.post<ClassifyResponse>(url, payload);

    return res.data.result;
}
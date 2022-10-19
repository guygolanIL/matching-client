import { httpClient } from '../http-client';
import { ApiResponse } from '../types';

type ProfileImage = {
    url: string;
}

export type PublicProfileInfo = {
    userId: number;
    name: string;
    profileImage?: ProfileImage;
}

export type FeedResponse = ApiResponse<Array<PublicProfileInfo>>;
export async function feed() {
    const url = "/feed";
    const res = await httpClient.get<FeedResponse>(url);

    return res.data.result;
}

export type Attitude = "POSITIVE" | 'NEGATIVE';

export type ClassifyResponsePayload = {
    classification: {
        attitude: Attitude
        classifierUserId: number
        classifiedUserId: number
    },
    matchedUserId?: number;
};
type ClassifyResponse = ApiResponse<ClassifyResponsePayload>;
type ClassifyRequest = {
    attitude: Attitude;
    classifiedUserId: number;
};
export async function classify(payload: ClassifyRequest) {
    const url = "/feed/classify";
    const res = await httpClient.post<ClassifyResponse>(url, payload);

    return res.data.result;
}
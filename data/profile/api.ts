import { httpClient } from "../http-client";
import { ApiResponse } from "../types";

export const supportedImageTypes = ['png', 'jpeg'] as const;

export type ImageType = (typeof supportedImageTypes)[number];

type ProfileImage = {
    id: number;
    type: ImageType;
    url: string;
    userId: number;
}

type UploadImageResponseBody = ApiResponse<ProfileImage>;
type UploadImageRequestBody = {
    type: ImageType;
    base64: string;
};
export async function uploadImage(requestbody: UploadImageRequestBody): Promise<UploadImageResponseBody> {
    const url = '/profile/image';

    const res = await httpClient.post<UploadImageResponseBody>(url, requestbody);
    return res.data;
}

type UserProfile = {
    id: number
    userId: number
    profileImage?: ProfileImage;
};
type GetUserProfileResponseBody = ApiResponse<UserProfile>;
export async function getUserProfile(): Promise<GetUserProfileResponseBody> {
    const url = '/profile';

    const res = await httpClient.get<GetUserProfileResponseBody>(url);
    return res.data;
}
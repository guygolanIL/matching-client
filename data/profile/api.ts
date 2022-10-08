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

type PrivateUserProfile = PublicUserProfile & {
    //add private fields
};
type GetLoggedUserProfileResponseBody = ApiResponse<PrivateUserProfile>;
export async function getPrivateUserProfile(): Promise<PrivateUserProfile> {
    const url = '/profile';

    const res = await httpClient.get<GetLoggedUserProfileResponseBody>(url);
    return res.data.result;
}

type PublicUserProfile = {
    userId: number
    profileImage?: ProfileImage;
};
type GetPublicUserProfileResponseBody = ApiResponse<PublicUserProfile>;
export async function getPublicUserProfile(userId: number): Promise<PublicUserProfile> {
    const url = `/profile/${userId}`;

    const res = await httpClient.get<GetPublicUserProfileResponseBody>(url);
    return res.data.result;
}
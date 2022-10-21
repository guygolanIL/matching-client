import { httpClient } from "../http-client";
import { UploadImageRequestBody } from "../profile/api";
import { ApiResponse } from "../types";

export type OnboardingStatus = 'INITIAL' | 'IN_PROGRESS' | 'COMPLETED';

export type OnboardingStatusResponse = ApiResponse<{ status: OnboardingStatus }>;

export async function getOnboardingStatus() {
    const url = '/onboarding';

    const res = await httpClient.get<OnboardingStatusResponse>(url);
    return res.data.result;
}

export type UpdateOnboardingRequestPayload = {
    step1?: { name: string };
    avatar?: UploadImageRequestBody;
};
export async function updateOnboardingStatus(payload: UpdateOnboardingRequestPayload) {
    const url = '/onboarding';

    const res = await httpClient.put<OnboardingStatusResponse>(url, payload);
    return res.data.result;
}
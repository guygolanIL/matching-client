import { PublicProfileInfo } from "../feed/api";
import { httpClient } from "../http-client";
import { ApiResponse } from "../types";

type MatchInfo = {
    id: number;
    matchedWith: PublicProfileInfo;
};

type GetMatchesResponse = ApiResponse<Array<MatchInfo>>;
export async function getMatches() {
    const res = await httpClient.get<GetMatchesResponse>('/match');

    return res.data.result;
}

export type Message = {
    id: number
    createdByUserId: number
    matchId: number
    content: string
    createdAt: string;
}

type GetMatchMessagesResponse = ApiResponse<Array<Message>>;
export async function getMatchMessages(matchId: number) {
    const res = await httpClient.get<GetMatchMessagesResponse>(`/match/${matchId}/message`);

    return res.data.result;
}

export type CreateMatchMessageResponse = ApiResponse<Message>;
export type CreateMatchMessageRequest = { content: string };
export async function createMatchMessage(matchId: number, payload: { content: string }) {
    const res = await httpClient.post<CreateMatchMessageResponse>(`/match/${matchId}/message`, payload);

    return res.data.result;
}
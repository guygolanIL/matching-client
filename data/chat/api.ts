import { PublicProfileInfo } from "../feed/api";
import { httpClient } from "../http-client";
import { ApiResponse } from "../types";

type MatchInfo = PublicProfileInfo & { email: string };

type GetMatchesResponse = ApiResponse<Array<MatchInfo>>;
export async function getMatches() {
    const res = await httpClient.get<GetMatchesResponse>('/match');

    return res.data.result;
}
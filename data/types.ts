import { AxiosError } from "axios";

export type ApiResponse<T extends object> = {
    result: T
};

export type ApiErrorResponse = {
    issues: Array<{
        field?: string;
        message: string;
    }>;
}

export type QueryError = AxiosError<ApiErrorResponse>;

export type UserInfo = {
    id: number;
    email: string;
}
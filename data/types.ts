
export type ApiResponse<T extends object> = {
    result: T
};

export type ApiErrorResponse = {
    issues: Array<{
        field?: string;
        message: string;
    }>;
}

export type UserInfo = {
    id: number;
    email: string;
}
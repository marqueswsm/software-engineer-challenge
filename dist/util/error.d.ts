declare class CustomError extends Error {
    private code;
    private details;
    constructor(code: string, message?: string | null, details?: CustomError[] | null);
}
export declare class BadRequestError extends CustomError {
    constructor(message: string, details?: unknown);
}
export declare class UsersNotFound extends CustomError {
    constructor(message: string, details?: unknown);
}
export {};

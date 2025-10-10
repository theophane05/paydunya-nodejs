export declare class ResponseError<T = object> extends Error {
    data: T | undefined;
    constructor(message: string, data?: T | undefined);
}

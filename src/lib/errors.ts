export class ResponseError<T  = object> extends Error {
    data: T | undefined = undefined

    constructor(message: string, data: T | undefined = undefined) {
        super(message)
        this.data = data;
    }
}
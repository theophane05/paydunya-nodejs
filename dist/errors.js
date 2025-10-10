"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    data = undefined;
    constructor(message, data = undefined) {
        super(message);
        this.data = data;
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=errors.js.map
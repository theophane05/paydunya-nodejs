"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
const axios_1 = __importDefault(require("axios"));
class Transport {
    setup;
    store = undefined;
    axios;
    constructor(setup, store = undefined) {
        this.setup = setup;
        this.store = store;
        this.axios = axios_1.default.create({
            baseURL: this.baseURL
        });
        this.axios.interceptors.request.use((config) => {
            return this.setup.extendRequestConfig(config);
        });
    }
    get baseURL() {
        return this.setup.mode === "test" ? 'https://app.paydunya.com/sandbox-api/v1' : 'https://app.paydunya.com/api/v1';
    }
}
exports.Transport = Transport;
//# sourceMappingURL=transport.js.map
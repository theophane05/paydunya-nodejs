"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
const credentials_1 = require("./credentials");
const axios_1 = __importDefault(require("axios"));
class Transport {
    setup;
    store = undefined;
    client;
    constructor(setup, store = undefined) {
        this.setup = setup;
        this.store = store;
        this.client = axios_1.default.create({
            baseURL: this.baseURL
        });
        this.client.interceptors.request.use((config) => {
            return this.setup.extendRequestConfig(config);
        });
    }
    get baseURL() {
        return this.setup.mode === credentials_1.PaydunyaEnvironment.TEST ? 'https://app.paydunya.com/sandbox-api/v1' : 'https://app.paydunya.com/api/v1';
    }
}
exports.Transport = Transport;
//# sourceMappingURL=transport.js.map
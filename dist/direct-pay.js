"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectPay = void 0;
const errors_1 = require("./errors");
const constants_1 = require("./constants");
const util_1 = __importDefault(require("util"));
class DirectPay {
    transport;
    responseText;
    description;
    transactionID;
    constructor(transport) {
        this.transport = transport;
    }
    /**
     * Credit a PAYDUNYA account
     * @param account Account alias, number or email
     * @param amount Amount to credit
     */
    async creditAccount(account, amount) {
        const body = {
            account_alias: account,
            amount: Number(amount),
        };
        const res = await this.transport.axios.post(constants_1.ApiRoutes.CREDIT_ACCOUNT, body);
        if (res.data.response_code === constants_1.ResponseCode.success) {
            this.responseText = res.data.response_text;
            this.description = res.data.description;
            this.transactionID = res.data.transaction_id;
        }
        else {
            const e = new errors_1.ResponseError(util_1.default.format("Failed to credit account. Please ensure %s and %s are valid OR check your account balance.", account, amount), res.data);
            throw e;
        }
    }
}
exports.DirectPay = DirectPay;
//# sourceMappingURL=direct-pay.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectPay = void 0;
const errors_1 = require("./errors");
const constants_1 = require("./constants");
/**
 * @deprecated
 * This endpoints are not working anymore. Throwing 404 errors
 */
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
        return this.transport.client.post(constants_1.Endpoints.CREDIT_ACCOUNT, body)
            .then((res) => {
            if (res.data.response_code === constants_1.ResponseCode.success) {
                this.responseText = res.data.response_text;
                this.description = res.data.description;
                this.transactionID = res.data.transaction_id;
                return {
                    responseText: this.responseText,
                    description: this.description,
                    transactionID: this.transactionID
                };
            }
            else {
                const e = new errors_1.ResponseError(`Failed to credit account. Please ensure ${account} and ${amount} are valid OR check your account balance.`, res.data);
                throw e;
            }
        });
    }
}
exports.DirectPay = DirectPay;

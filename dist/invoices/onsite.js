"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnsiteInvoice = void 0;
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const invoice_1 = require("./invoice");
/**
 * @deprecated
 * These endpoints are not working anymore. Throwing 404 errors
 */
class OnsiteInvoice extends invoice_1.Invoice {
    token;
    oprToken;
    responseText;
    status;
    receiptURL;
    customer;
    constructor(transport) {
        super(transport);
    }
    /**
     *
     * @param customer The account alias, username or phone number
     */
    async create(customer) {
        let body = {
            invoice_data: this.asRequestBody(),
            opr_data: {
                account_alias: customer,
            },
        };
        return this.transport.client
            .post(constants_1.Endpoints.CREATE_ONSITEINVOCE, body)
            .then((response) => {
            if (response.data?.response_code === constants_1.ResponseCode.success) {
                return {
                    token: response.data.invoice_token,
                    oprToken: response.data.token,
                    responseText: response.data.description,
                };
            }
            else {
                let error = new errors_1.ResponseError("Failed to create invoice", response.data);
                throw error;
            }
        });
    }
    /**
     * Charge paydunya account
     * @param oprToken The OPR token of the invoice to confirm
     * * @param confirmToken Confirmation token sent to PAYDUNYA user
     */
    async charge(oprToken, confirmToken) {
        let body = {
            token: oprToken,
            confirm_token: confirmToken,
        };
        return this.transport.client
            .post(constants_1.Endpoints.CHARGE_ONSITEINVOCE, body)
            .then((response) => {
            if (response.data?.response_code === constants_1.ResponseCode.success) {
                return {
                    responseText: response.data.response_text,
                    status: response.data.invoice_data.status,
                    receiptURL: response.data.invoice_data.receipt_url,
                    customer: response.data.invoice_data.customer,
                };
            }
            else {
                let error = new errors_1.ResponseError("Failed to charge invoice. Check OPR/confirm token and try again.", response.data);
                throw error;
            }
        });
    }
}
exports.OnsiteInvoice = OnsiteInvoice;
//# sourceMappingURL=onsite.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_1 = require("./invoice");
const errors_1 = require("../errors");
const constants_1 = require("../constants");
class CheckoutInvoice extends invoice_1.Invoice {
    token;
    url;
    status;
    responseText;
    customer;
    receiptURL;
    receipt_identifier;
    provider_reference;
    constructor(client) {
        super(client);
    }
    /**
     * Create invoice
     */
    async create() {
        const requestBody = this.asRequestBody();
        return this.transport.axios
            .post(constants_1.ApiRoutes.CREATE_INVOICE, requestBody)
            .then((res) => {
            if (res.data.response_code === constants_1.ResponseCode.success) {
                this.token = res.data.token;
                this.url = res.data.response_text;
                return this.confirm(this.token);
            }
            else {
                const e = new errors_1.ResponseError("Failed to create invoice.", res.data);
                throw e;
            }
        });
    }
    /**
     * Get token status.
     * @param  {string} givenToken Invoice token
     */
    async confirm(givenToken) {
        const token = givenToken ? givenToken : this.token;
        this.transport.axios
            .get(`${constants_1.ApiRoutes.CONFIRM_INVOICE}${token}`)
            .then((res) => {
            const body = res.data;
            if (body.response_code === constants_1.ResponseCode.success) {
                this.status = body.status;
                this.responseText = body.response_text;
                if (this.status === constants_1.Status.COMPLETED) {
                    this.customer = body.customer;
                    this.receiptURL = body.receipt_url;
                    this.receipt_identifier = body.receipt_identifier;
                    this.provider_reference = body.provider_reference;
                    if (body.custom_data && Object.keys(body.custom_data).length > 0) {
                        this.customData = body.custom_data;
                    }
                }
                this.totalAmount = body.invoice.total_amount;
                return this.asObject;
            }
            else {
                const e = new errors_1.ResponseError("Could not confirm invoice status.", res.data);
                throw e;
            }
        });
    }
    get asObject() {
        return {
            token: this.token,
            url: this.url,
            status: this.status,
            responseText: this.responseText,
            customer: this.customer,
            receiptURL: this.receiptURL,
            receipt_identifier: this.receipt_identifier,
            provider_reference: this.provider_reference,
            customData: this.customData,
            totalAmount: this.totalAmount,
        };
    }
}
exports.default = CheckoutInvoice;
//# sourceMappingURL=checkout.js.map
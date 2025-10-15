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
    hash;
    constructor(client) {
        super(client);
    }
    /**
     * Create invoice
     */
    async create() {
        const requestBody = this.asRequestBody();
        return this.transport.client
            .post(constants_1.Endpoints.CREATE_INVOICE, requestBody)
            .then((res) => {
            if (res.data.response_code === constants_1.ResponseCode.success) {
                this.token = res.data.token;
                this.url = res.data.response_text;
                return this.getTokenStatus(this.token);
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
    async getTokenStatus(givenToken) {
        const token = givenToken ? givenToken : this.token;
        return this.transport.client
            .get(`${constants_1.Endpoints.CONFIRM_INVOICE}${token}`)
            .then((res) => {
            const body = res.data;
            if (body.response_code === constants_1.ResponseCode.success) {
                this.status = body.status;
                this.responseText = body.response_text;
                this.hash = body?.hash;
                this.items = body.invoice.items;
                this.taxes = body.taxes;
                this.description = body.description;
                if (body.actions) {
                    this.cancelURL = body.actions.cancel_url;
                    this.callbackURL = body.actions.callback_url;
                    this.returnURL = body.actions.return_url;
                }
                this.totalAmount = body.invoice.total_amount;
                if (this.status === constants_1.InvoiceStatus.COMPLETED) {
                    this.customer = body.customer;
                    this.receiptURL = body.receipt_url;
                    this.receipt_identifier = body.receipt_identifier;
                    this.provider_reference = body.provider_reference;
                    if (body.custom_data && Object.keys(body.custom_data).length > 0) {
                        this.customData = body.custom_data;
                    }
                }
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
            hash: this.hash,
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
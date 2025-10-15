"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaydunyaClient = void 0;
const balance_1 = require("./balance");
const transport_1 = require("./transport");
const direct_pay_1 = require("./direct-pay");
const checkout_1 = __importDefault(require("./invoices/checkout"));
const onsite_1 = require("./invoices/onsite");
const credentials_1 = require("./credentials");
const invoice_1 = require("./invoices/invoice");
class PaydunyaClient {
    transport;
    constructor(transport) {
        this.transport = transport;
    }
    get store() {
        return this.transport.store;
    }
    set store(store) {
        this.transport.store = store;
    }
    invoiceInstance() {
        return new invoice_1.Invoice(this.transport);
    }
    checkoutInvoiceInstance() {
        return new checkout_1.default(this.transport);
    }
    onsiteInvoiceInstance() {
        return new onsite_1.OnsiteInvoice(this.transport);
    }
    directpayInstance() {
        return new direct_pay_1.DirectPay(this.transport);
    }
    balanceInstance() {
        return new balance_1.Balance(this.transport);
    }
    static fromCredentialsInstance(credentials) {
        let client = new PaydunyaClient(new transport_1.Transport(credentials));
        return client;
    }
    static fromCredentials(params) {
        let client = new PaydunyaClient(new transport_1.Transport(new credentials_1.Credentials(params)));
        return client;
    }
    static autoDetect(mode = credentials_1.PaydunyaEnvironment.LIVE) {
        let client = new PaydunyaClient(new transport_1.Transport(new credentials_1.Credentials({
            masterKey: process.env.PAYDUNYA_MASTER_KEY || "",
            privateKey: process.env.PAYDUNYA_PRIVATE_KEY || "",
            publicKey: process.env.PAYDUNYA_PUBLIC_KEY || "",
            token: process.env.PAYDUNYA_TOKEN || "",
            mode: (process.env.PAYDUNYA_MODE || mode),
        })));
        return client;
    }
}
exports.PaydunyaClient = PaydunyaClient;
//# sourceMappingURL=index.js.map
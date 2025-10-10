import { Balance } from "./balance";
import { Transport } from "./transport";
import { DirectPay } from "./direct-pay";
import CheckoutInvoice from "./invoices/checkout";
import { OnsiteInvoice } from "./invoices/onsite";
import { Credentials } from "./credentials";
export declare class PaydunyaClient {
    transport: Transport;
    constructor(transport: Transport);
    checkoutInvoiceInstance(): CheckoutInvoice;
    onsiteInvoiceInstance(): OnsiteInvoice;
    directpayInstance(): DirectPay;
    balanceInstance(): Balance;
    static fromCredentialsInstance(credentials: Credentials): PaydunyaClient;
    static fromCredentials(params: ConstructorParameters<typeof Credentials>[0]): PaydunyaClient;
}

import { Balance } from "./balance";
import { Transport } from "./transport";
import { DirectPay } from "./direct-pay";
import CheckoutInvoice from "./invoices/checkout";
import { OnsiteInvoice } from "./invoices/onsite";
import { Credentials, PaydunyaEnvironment } from "./credentials";
import { Store } from "./store";
import { Invoice } from "./invoices/invoice";
export declare class PaydunyaClient {
    transport: Transport;
    constructor(transport: Transport);
    get store(): Store | undefined;
    set store(store: Store);
    invoiceInstance(): Invoice;
    checkoutInvoiceInstance(): CheckoutInvoice;
    /**
     * @deprecated - OnsiteInvoice endpoint seems to be deprecated
     */
    onsiteInvoiceInstance(): OnsiteInvoice;
    /**
     * @deprecated - Direct Pay endpoint seems to be deprecated
     */
    directpayInstance(): DirectPay;
    balanceInstance(): Balance;
    static fromCredentialsInstance(credentials: Credentials): PaydunyaClient;
    static fromCredentials(params: ConstructorParameters<typeof Credentials>[0]): PaydunyaClient;
    static autoDetect(mode?: PaydunyaEnvironment): PaydunyaClient;
}
export * from "./balance";
export * from "./credentials";
export * from "./errors";
export * from "./invoices/checkout";
export * from "./invoices/invoice";
export * from "./store";
export * from "./transport";

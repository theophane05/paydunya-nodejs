import { Balance } from "./balance";
import { Transport } from "./transport";
import { DirectPay } from "./direct-pay";
import CheckoutInvoice from "./invoices/checkout";
import { OnsiteInvoice } from "./invoices/onsite";
import { Credentials, PaydunyaEnvironment } from "./credentials";
import { Store } from "./store";
import { Invoice } from "./invoices/invoice";

export class PaydunyaClient {
    transport: Transport;

    constructor(transport: Transport) {
        this.transport = transport;
    }

    get store(): Store | undefined {
        return this.transport.store;
    }

    set store(store: Store) {
        this.transport.store = store;
    }

    invoiceInstance() {
        return new Invoice(this.transport);
    }

    checkoutInvoiceInstance() {
        return new CheckoutInvoice(this.transport);
    }

    onsiteInvoiceInstance() {
        return new OnsiteInvoice(this.transport);
    }

    directpayInstance() {
        return new DirectPay(this.transport);
    }

    balanceInstance() {
        return new Balance(this.transport);
    }

    static fromCredentialsInstance(credentials: Credentials) {
        let client = new PaydunyaClient(
            new Transport(
                credentials
            )
        )
        return client;
    }

    static fromCredentials(params: ConstructorParameters<typeof Credentials>[0]) {
        let client = new PaydunyaClient(
            new Transport(
                new Credentials(params)
            )
        )
        return client;
    }

    static autoDetect(mode: PaydunyaEnvironment = PaydunyaEnvironment.LIVE) {
        let client = new PaydunyaClient(
            new Transport(
                new Credentials({
                    masterKey: process.env.PAYDUNYA_MASTER_KEY || "",
                    privateKey: process.env.PAYDUNYA_PRIVATE_KEY || "",
                    publicKey: process.env.PAYDUNYA_PUBLIC_KEY || "",
                    token: process.env.PAYDUNYA_TOKEN || "",
                    mode: (process.env.PAYDUNYA_MODE || mode) as PaydunyaEnvironment,
                })
            )
        )
        return client;
    }

}
import { Invoice } from "./invoice";
import { Transport } from "../transport";
export default class CheckoutInvoice extends Invoice {
    token?: string;
    url?: string;
    status?: string;
    responseText?: string;
    customer?: any;
    receiptURL?: string;
    receipt_identifier?: string;
    provider_reference?: string;
    constructor(client: Transport);
    /**
     * Create invoice
     */
    create(): Promise<void>;
    /**
     * Get token status.
     * @param  {string} givenToken Invoice token
     */
    confirm(givenToken?: string): Promise<void>;
    get asObject(): {
        token: string | undefined;
        url: string | undefined;
        status: string | undefined;
        responseText: string | undefined;
        customer: any;
        receiptURL: string | undefined;
        receipt_identifier: string | undefined;
        provider_reference: string | undefined;
        customData: Record<string, any>;
        totalAmount: number;
    };
}

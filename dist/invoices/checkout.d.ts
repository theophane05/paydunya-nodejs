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
    hash?: string;
    constructor(client: Transport);
    /**
     * Create invoice
     */
    create(): Promise<{
        token: string | undefined;
        url: string | undefined;
        status: string | undefined;
        hash: string | undefined;
        responseText: string | undefined;
        customer: any;
        receiptURL: string | undefined;
        receipt_identifier: string | undefined;
        provider_reference: string | undefined;
        customData: Record<string, any>;
        totalAmount: number;
    }>;
    /**
     * Get token status.
     * @param  {string} givenToken Invoice token
     */
    getTokenStatus(givenToken?: string): Promise<{
        token: string | undefined;
        url: string | undefined;
        status: string | undefined;
        hash: string | undefined;
        responseText: string | undefined;
        customer: any;
        receiptURL: string | undefined;
        receipt_identifier: string | undefined;
        provider_reference: string | undefined;
        customData: Record<string, any>;
        totalAmount: number;
    }>;
    get asObject(): {
        token: string | undefined;
        url: string | undefined;
        status: string | undefined;
        hash: string | undefined;
        responseText: string | undefined;
        customer: any;
        receiptURL: string | undefined;
        receipt_identifier: string | undefined;
        provider_reference: string | undefined;
        customData: Record<string, any>;
        totalAmount: number;
    };
}

import { Transport } from "../transport";
import { Invoice } from "./invoice";
/**
 * @deprecated
 * These endpoints are not working anymore. Throwing 404 errors
 */
export declare class OnsiteInvoice extends Invoice {
    token?: string;
    oprToken?: string;
    responseText?: string;
    status?: string;
    receiptURL?: string;
    customer?: any;
    constructor(transport: Transport);
    /**
     *
     * @param customer The account alias, username or phone number
     */
    create(customer: string): Promise<{
        token: any;
        oprToken: any;
        responseText: any;
    }>;
    /**
     * Charge paydunya account
     * @param oprToken The OPR token of the invoice to confirm
     * * @param confirmToken Confirmation token sent to PAYDUNYA user
     */
    charge(oprToken: string, confirmToken: string): Promise<{
        responseText: any;
        status: any;
        receiptURL: any;
        customer: any;
    }>;
}

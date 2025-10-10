import { Transport } from "./transport";
export declare class DirectPay {
    private transport;
    responseText?: string;
    description?: string;
    transactionID?: string;
    constructor(transport: Transport);
    /**
     * Credit a PAYDUNYA account
     * @param account Account alias, number or email
     * @param amount Amount to credit
     */
    creditAccount(account: string, amount: number): Promise<void>;
}

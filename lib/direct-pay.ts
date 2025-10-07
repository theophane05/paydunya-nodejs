import util from 'util';
import { PaydunyaClient } from './client';
import { ResponseError } from './errors';


export class DirectPay {
    private client: PaydunyaClient;

    public responseText?: string;
    public description?: string;
    public transactionID?: string;

    constructor(client: PaydunyaClient) {
        this.client = client;
    }

    /**
     * Credit a PAYDUNYA account
     * @param account Account alias, number or email
     * @param amount Amount to credit
     */
    async creditAccount(account: string, amount: number): Promise<void> {
        const body = {
            account_alias: account,
            amount: Number(amount)
        };

        const res = await this.client.axios
            .post(`/direct-pay/credit-account`, body);

        if (res.data.response_code === '00') {
            this.responseText = res.data.response_text;
            this.description = res.data.description;
            this.transactionID = res.data.transaction_id;
        } else {
            const e = new ResponseError(
                util.format(
                    'Failed to credit account. Please ensure %s and %s are valid OR check your account balance.',
                    account,
                    amount
                ),
                res.data
            );
            throw e;
        }

    }
}
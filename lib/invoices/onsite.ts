import { PaydunyaClient } from "../client";
import { ResponseError } from "../errors";
import { Invoice } from "./invoice";


export class OnsiteInvoice extends Invoice {
    token?: string;
    oprToken?: string;
    responseText?: string;
    status?: string;
    receiptURL?: string;
    customer?: any;

    constructor(client: PaydunyaClient) {
        super(client);
    }

    /**
     * 
     * @param customer The account alias, username or phone number
     */
    async create(customer: string) {
        let body = {
            invoice_data: this.asRequestBody(),
            opr_data: {
                account_alias: customer
            }
        }
        return this.client.axios.post(`/opr/create`, body)
            .then((response) => {
                if (response.data?.response_code === '00') {
                    this.token = response.data.invoice_token;
                    this.oprToken = response.data.token;
                    this.responseText = response.data.description

                    return {
                        token: this.token,
                        oprToken: this.oprToken,
                        responseText: this.responseText
                    }
                }
                else {
                    let error = new ResponseError('Failed to create invoice', response.data)
                    throw error;
                }
            });
    }


    /**
     * Charge paydunya account
     * @param oprToken The OPR token of the invoice to confirm
     * * @param confirmToken Confirmation token sent to PAYDUNYA user
     */
    async charge(oprToken: string, confirmToken: string) {
        let body = {
            token: oprToken,
            confirm_token: confirmToken
        };

        return this.client.axios.post(`/opr/charge`, body)
            .then((response) => {
                if (response.data?.response_code === '00') {
                    this.responseText = response.data.response_text;
                    this.status = response.data.invoice_data.status;
                    this.receiptURL = response.data.invoice_data.receipt_url;
                    this.customer = response.data.invoice_data.customer;

                    return {
                        responseText: this.responseText,
                        status: this.status,
                        receiptURL: response.data.invoice_data.receipt_url,
                        customer: response.data.invoice_data.customer,
                    }
                } else {
                    let error = new ResponseError('Failed to charge invoice. Check OPR/confirm token and try again.', response.data);
                    throw error;
                }
            });
    }


}
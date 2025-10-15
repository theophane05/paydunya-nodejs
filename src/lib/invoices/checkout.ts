import { Invoice } from "./invoice";
import { Transport } from "../transport";
import { ResponseError } from "../errors";
import { Endpoints, ResponseCode, InvoiceStatus } from "../constants";


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


  constructor(client: Transport) {
    super(client);
  }

  /**
   * Create invoice
   */
  async create() {
    const requestBody = this.asRequestBody();

    return this.transport.client
      .post(Endpoints.CREATE_INVOICE, requestBody)
      .then((res) => {
        if (res.data.response_code === ResponseCode.success) {
          this.token = res.data.token;
          this.url = res.data.response_text;
          return this.getTokenStatus(this.token);
        } else {
          const e = new ResponseError("Failed to create invoice.", res.data);
          throw e;
        }
      });
  }

  /**
   * Get token status.
   * @param  {string} givenToken Invoice token
   */
  async getTokenStatus(givenToken?: string) {
    const token = givenToken ? givenToken : this.token;
    return this.transport.client
      .get(`${Endpoints.CONFIRM_INVOICE}${token}`)
      .then((res) => {
        const body = res.data;

        if (body.response_code === ResponseCode.success) {
          this.status = body.status;
          this.responseText = body.response_text;

          this.hash = body?.hash;
          this.items = body.invoice.items;
          this.taxes = body.taxes;
          this.description = body.description;

          if (body.actions) {
            this.cancelURL = body.actions.cancel_url;
            this.callbackURL = body.actions.callback_url;
            this.returnURL = body.actions.return_url;
          }

          this.totalAmount = body.invoice.total_amount;

          if (this.status === InvoiceStatus.COMPLETED) {
            this.customer = body.customer;
            this.receiptURL = body.receipt_url;
            this.receipt_identifier = body.receipt_identifier;
            this.provider_reference = body.provider_reference;
            if (body.custom_data && Object.keys(body.custom_data).length > 0) {
              this.customData = body.custom_data;
            }
          }
        
          return this.asObject;
        } else {
          const e = new ResponseError(
            "Could not confirm invoice status.",
            res.data
          );
          throw e;
        }
      });
  }

  get asObject() {
    return {
      token: this.token,
      url: this.url,
      status: this.status,
      hash: this.hash,
      responseText: this.responseText,
      customer: this.customer,
      receiptURL: this.receiptURL,
      receipt_identifier: this.receipt_identifier,
      provider_reference: this.provider_reference,
      customData: this.customData,
      totalAmount: this.totalAmount,
    }
  }
}

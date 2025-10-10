import { Transport } from "../transport";
import { ApiRoutes, ResponseCode } from "../constants";
import { ResponseError } from "../errors";
import { Invoice } from "./invoice";

export class OnsiteInvoice extends Invoice {
  token?: string;
  oprToken?: string;
  responseText?: string;
  status?: string;
  receiptURL?: string;
  customer?: any;

  constructor(transport: Transport) {
    super(transport);
  }

  /**
   *
   * @param customer The account alias, username or phone number
   */
  async create(customer: string) {
    let body = {
      invoice_data: this.asRequestBody(),
      opr_data: {
        account_alias: customer,
      },
    };
    return this.transport.axios
      .post(ApiRoutes.CREATE_ONSITEINVOCE, body)
      .then((response) => {
        if (response.data?.response_code === ResponseCode.success) {
          return {
            token: response.data.invoice_token,
            oprToken: response.data.token,
            responseText: response.data.description,
          };
        } else {
          let error = new ResponseError(
            "Failed to create invoice",
            response.data
          );
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
      confirm_token: confirmToken,
    };

    return this.transport.axios
      .post(ApiRoutes.CHARGE_ONSITEINVOCE, body)
      .then((response) => {
        if (response.data?.response_code === ResponseCode.success) {
          return {
            responseText: response.data.response_text,
            status: response.data.invoice_data.status,
            receiptURL: response.data.invoice_data.receipt_url,
            customer: response.data.invoice_data.customer,
          };
        } else {
          let error = new ResponseError(
            "Failed to charge invoice. Check OPR/confirm token and try again.",
            response.data
          );
          throw error;
        }
      });
  }
}

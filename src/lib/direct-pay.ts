import { Transport } from "./transport";
import { ResponseError } from "./errors";
import { Endpoints, ResponseCode } from "./constants";
import util from "util"

export class DirectPay {
  private transport: Transport;

  public responseText?: string;
  public description?: string;
  public transactionID?: string;

  constructor(transport: Transport) {
    this.transport = transport;
  }

  /**
   * Credit a PAYDUNYA account
   * @param account Account alias, number or email
   * @param amount Amount to credit
   */
  async creditAccount(account: string, amount: number) {
    const body = {
      account_alias: account,
      amount: Number(amount),
    };
    return this.transport.client.post(Endpoints.CREDIT_ACCOUNT, body)
      .then((res) => {
        console.log(res.data);

        if (res.data.response_code === ResponseCode.success) {
          this.responseText = res.data.response_text;
          this.description = res.data.description;
          this.transactionID = res.data.transaction_id;
          return { 
            responseText: this.responseText, 
            description: this.description, 
            transactionID: this.transactionID 
          }
        } else {
          const e = new ResponseError(
            util.format(
              "Failed to credit account. Please ensure %s and %s are valid OR check your account balance.",
              account,
              amount
            ),
            res.data
          );
          throw e;
        }
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      })
  }
}

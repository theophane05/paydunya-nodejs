import { Transport } from "./transport";
import { ResponseError } from "./errors";
import { ApiRoutes, ResponseCode } from "./constants";
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
  async creditAccount(account: string, amount: number): Promise<void> {
    const body = {
      account_alias: account,
      amount: Number(amount),
    };

    const res = await this.transport.axios.post(ApiRoutes.CREDIT_ACCOUNT, body);

    if (res.data.response_code === ResponseCode.success) {
      this.responseText = res.data.response_text;
      this.description = res.data.description;
      this.transactionID = res.data.transaction_id;
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
  }
}

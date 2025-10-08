export enum Status {
  Completed = "completed",
  Canceled = "canceled",
  Pending = "pending",
  Failed = "failed",
}

export enum ResponseCode {
  success = "00",
}

export enum ApiRoutes {
  CREATE_INVOICE = "/checkout-invoice/create",
  CONFIRM_INVOICE = "/checkout-invoice/confirm/",
  CREATE_ONSITEINVOCE = "/opr/create",
  CHARGE_ONSITEINVOCE = "/opr/charge",
  CREDIT_ACCOUNT = "/direct-pay/credit-account",
}

export enum Status {
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  PENDING = "pending",
  FAILED = "failed",
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
  CHECK_BALANCE = "/disburse/check-balance"
}

export enum PaymentChannel {
    Card = "card",
    OrangeMoneySenegal = "orange-money-senegal",
    WaveSenegal = "wave-senegal",
    FreeMoneySenegal = "free-money-senegal",
    ExpressoSn = "expresso-sn",
    WizallSenegal = "wizall-senegal",
    MtnBenin = "mtn-benin",
    MoovBenin = "moov-benin",
    OrangeMoneyCi = "orange-money-ci",
    WaveCi = "wave-ci",
    MtnCi = "mtn-ci",
    MoovCi = "moov-ci",
    TMoneyTogo = "t-money-togo",
    MoovTogo = "moov-togo",
    OrangeMoneyMali = "orange-money-mali",
    MoovMl = "moov-ml",
    OrangeMoneyBurkina = "orange-money-burkina",
    MoovBurkinaFaso = "moov-burkina-faso"
}

export const SUPPORTED_COUNTRY_CODES = {
    SN: "SN",
    CI: "CI",
    BJ: "BJ",
    TG: "TG",
    ML: "ML",
    BF: "BF"
} as const;
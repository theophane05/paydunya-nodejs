"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_COUNTRY_CODES = exports.PaymentChannel = exports.Endpoints = exports.ResponseCode = exports.InvoiceStatus = void 0;
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["COMPLETED"] = "completed";
    InvoiceStatus["CANCELLED"] = "cancelled";
    InvoiceStatus["PENDING"] = "pending";
    InvoiceStatus["FAILED"] = "failed";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var ResponseCode;
(function (ResponseCode) {
    ResponseCode["success"] = "00";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
var Endpoints;
(function (Endpoints) {
    Endpoints["CREATE_INVOICE"] = "/checkout-invoice/create";
    Endpoints["CONFIRM_INVOICE"] = "/checkout-invoice/confirm/";
    Endpoints["CREATE_ONSITEINVOCE"] = "/opr/create";
    Endpoints["CHARGE_ONSITEINVOCE"] = "/opr/charge";
    Endpoints["CREDIT_ACCOUNT"] = "/direct-pay/credit-account";
    Endpoints["CHECK_BALANCE"] = "/disburse/check-balance";
})(Endpoints || (exports.Endpoints = Endpoints = {}));
var PaymentChannel;
(function (PaymentChannel) {
    PaymentChannel["Card"] = "card";
    PaymentChannel["OrangeMoneySenegal"] = "orange-money-senegal";
    PaymentChannel["WaveSenegal"] = "wave-senegal";
    PaymentChannel["FreeMoneySenegal"] = "free-money-senegal";
    PaymentChannel["ExpressoSn"] = "expresso-sn";
    PaymentChannel["WizallSenegal"] = "wizall-senegal";
    PaymentChannel["MtnBenin"] = "mtn-benin";
    PaymentChannel["MoovBenin"] = "moov-benin";
    PaymentChannel["OrangeMoneyCi"] = "orange-money-ci";
    PaymentChannel["WaveCi"] = "wave-ci";
    PaymentChannel["MtnCi"] = "mtn-ci";
    PaymentChannel["MoovCi"] = "moov-ci";
    PaymentChannel["TMoneyTogo"] = "t-money-togo";
    PaymentChannel["MoovTogo"] = "moov-togo";
    PaymentChannel["OrangeMoneyMali"] = "orange-money-mali";
    PaymentChannel["MoovMl"] = "moov-ml";
    PaymentChannel["OrangeMoneyBurkina"] = "orange-money-burkina";
    PaymentChannel["MoovBurkinaFaso"] = "moov-burkina-faso";
})(PaymentChannel || (exports.PaymentChannel = PaymentChannel = {}));
exports.SUPPORTED_COUNTRY_CODES = {
    SN: "SN",
    CI: "CI",
    BJ: "BJ",
    TG: "TG",
    ML: "ML",
    BF: "BF"
};
//# sourceMappingURL=constants.js.map
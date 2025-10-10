"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_COUNTRY_CODES = exports.PaymentChannel = exports.ApiRoutes = exports.ResponseCode = exports.Status = void 0;
var Status;
(function (Status) {
    Status["COMPLETED"] = "completed";
    Status["CANCELLED"] = "cancelled";
    Status["PENDING"] = "pending";
    Status["FAILED"] = "failed";
})(Status || (exports.Status = Status = {}));
var ResponseCode;
(function (ResponseCode) {
    ResponseCode["success"] = "00";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
var ApiRoutes;
(function (ApiRoutes) {
    ApiRoutes["CREATE_INVOICE"] = "/checkout-invoice/create";
    ApiRoutes["CONFIRM_INVOICE"] = "/checkout-invoice/confirm/";
    ApiRoutes["CREATE_ONSITEINVOCE"] = "/opr/create";
    ApiRoutes["CHARGE_ONSITEINVOCE"] = "/opr/charge";
    ApiRoutes["CREDIT_ACCOUNT"] = "/direct-pay/credit-account";
    ApiRoutes["CHECK_BALANCE"] = "/disburse/check-balance";
})(ApiRoutes || (exports.ApiRoutes = ApiRoutes = {}));
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
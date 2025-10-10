"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
class Money {
    amount;
    currency;
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    static parse(value) {
        let [amount, currency] = value.split(" ");
        return new Money(parseFloat(amount || "0"), currency?.trim() || "XOF");
    }
}
class Balance {
    transport;
    axios;
    constructor(transport) {
        this.transport = transport;
        this.axios = axios_1.default.create({
            baseURL: "https://app.paydunya.com/api/v2"
        });
        this.axios.interceptors.request.use((config) => {
            return this.transport.setup.extendRequestConfig(config);
        });
    }
    async getAll() {
        return this.axios.get(constants_1.ApiRoutes.CHECK_BALANCE)
            .then((result) => {
            if (result.data.success) {
                let items = {};
                Object.keys(constants_1.SUPPORTED_COUNTRY_CODES).forEach((country) => {
                    items[country] = Money.parse(result.data[`Balance ${country}`]);
                });
                return items;
            }
            return undefined;
        });
    }
    async getBalanceByCountry(country) {
        let result = await this.getAll();
        if (result && result[country]) {
            return result[country];
        }
    }
    async getAccountBalance(account) {
        return this.axios.get(`${constants_1.ApiRoutes.CHECK_BALANCE}/${account}`)
            .then((result) => {
            if (result.data.success) {
                return result.data;
            }
            return undefined;
        });
    }
}
exports.Balance = Balance;
//# sourceMappingURL=balance.js.map
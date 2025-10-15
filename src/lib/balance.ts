import { Transport } from "./transport";
import axios, { AxiosInstance } from "axios";
import { Endpoints, SUPPORTED_COUNTRY_CODES } from "./constants";

type SupportedCountryCode = keyof typeof SUPPORTED_COUNTRY_CODES;

type BalanceByCountryKey = `Balance ${SupportedCountryCode}`

type BalanceByCountry = {
    [key in BalanceByCountryKey]: string;
};

interface BalanceResult extends BalanceByCountry {
    success: boolean;
    description: string;
}

interface AccountBalanceResult extends Partial<BalanceByCountry> {
    success: boolean;
    description: string;
}

class Money {
    amount: number;
    currency: string;

    constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;
    }

    static parse(value: string) {
        let [amount, currency] = value.split(" ")
        return new Money(parseFloat(amount || "0"), currency?.trim() || "XOF")
    }
}

export class Balance {

    transport: Transport
    axios: AxiosInstance

    constructor(transport: Transport) {
        this.transport = transport;
        this.axios = axios.create({
            baseURL: "https://app.paydunya.com/api/v2"
        });
        this.axios.interceptors.request.use((config) => {
            return this.transport.setup.extendRequestConfig(config);
        })
    }

    async getAll() {
        return this.axios.get<BalanceResult>(Endpoints.CHECK_BALANCE)
            .then((result) => {
                if (result.data.success) {

                    let items: { [key in SupportedCountryCode]?: Money } = {};
                    Object.keys(SUPPORTED_COUNTRY_CODES).forEach((country) => {
                        (items as any)[country] = Money.parse((result.data as any)[`Balance ${country}`])
                    });

                    return items;
                }
                return undefined;
            });
    }

    async getBalanceByCountry(country: SupportedCountryCode) {
        let result = await this.getAll()
        if (result && result[country]) {
            return result[country];
        }
    }

    async getAccountBalance(account: string) {
        return this.axios.get<AccountBalanceResult>(`${Endpoints.CHECK_BALANCE}/${account}`)
            .then((result) => {
                if (result.data.success) {
                    return result.data
                }
                return undefined;
            });
    }

}
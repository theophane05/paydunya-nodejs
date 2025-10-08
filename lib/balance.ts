import { PaydunyaClient } from "./client";
import axios, { Axios } from "axios";
import { ApiRoutes } from "./constants";

const CountryCodes = {
    SN: "SN",
    CI: "CI",
    BJ: "BJ",
    TG: "TG",
    ML: "ML",
    BF: "BF"
}  as const;

type SupportedCountryCode = keyof typeof CountryCodes

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
        return new Money(parseFloat(amount), currency.trim())
    }
}

export class Balance {

    client: PaydunyaClient
    axios: Axios

    constructor(client: PaydunyaClient) {
        this.client = client;
        this.axios = axios.create({
            baseURL: "https://app.paydunya.com/api/v2"
        });
        this.axios.interceptors.request.use((config) => {
            return this.client.setup.extendRequestConfig(config);
        })
    }

    async getAll() {
        return this.client.axios.get<BalanceResult>(ApiRoutes.CHECK_BALANCE)
            .then((result) => {
                if (result.data.success) {
                    
                    let items: { [key in SupportedCountryCode]?: Money } = {};
                    Object.keys(CountryCodes).forEach((country) => {
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
        return this.client.axios.get<AccountBalanceResult>(`${ApiRoutes.CHECK_BALANCE}/${account}`)
            .then((result) => {
                if (result.data.success) {
                    return result.data
                }
                return undefined;
            });
    }

}
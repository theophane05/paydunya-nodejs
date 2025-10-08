import { PaydunyaClient } from "./client";
import axios, { Axios } from "axios";
import { ApiRoutes } from "./constants";

type SupportedCountryCode = "SN" | "CI" | "BJ" | "TG" | "ML" | "BF"

interface BalanceByCountry {
    ["Balance SN"]: string;
    ["Balance CI"]: string;
    ["Balance BJ"]: string;
    ["Balance TG"]: string;
    ["Balance ML"]: string;
    ["Balance BF"]: string;
}

interface BalanceResult extends BalanceByCountry {
    success: boolean;
    description: string;
}

interface AccountBalanceResult extends Partial<BalanceByCountry> {
    success: boolean;
    description: string;
}

export class Money {
    amount: number;
    currency: string;

    constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;
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
                    return result.data
                }
                return undefined;
            });
    }

    async getBalanceByCountry(country: SupportedCountryCode) {
        let result = await this.getAll()
        if (result && Object.keys(result).includes(`Balance ${country}`)) {
            let [amount, currency] = result[`Balance ${country}`].split(" ")
            return new Money(parseFloat(amount), currency);
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
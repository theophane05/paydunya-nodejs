import { Transport } from "./transport";
import { AxiosInstance } from "axios";
import { SUPPORTED_COUNTRY_CODES } from "./constants";
type SupportedCountryCode = keyof typeof SUPPORTED_COUNTRY_CODES;
type BalanceByCountryKey = `Balance ${SupportedCountryCode}`;
type BalanceByCountry = {
    [key in BalanceByCountryKey]: string;
};
interface AccountBalanceResult extends Partial<BalanceByCountry> {
    success: boolean;
    description: string;
}
declare class Money {
    amount: number;
    currency: string;
    constructor(amount: number, currency: string);
    static parse(value: string): Money;
}
export declare class Balance {
    transport: Transport;
    axios: AxiosInstance;
    constructor(transport: Transport);
    getAll(): Promise<{
        SN?: Money;
        CI?: Money;
        BJ?: Money;
        TG?: Money;
        ML?: Money;
        BF?: Money;
    } | undefined>;
    getBalanceByCountry(country: SupportedCountryCode): Promise<Money | undefined>;
    getAccountBalance(account: string): Promise<AccountBalanceResult | undefined>;
}
export {};

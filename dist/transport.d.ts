import { Credentials } from "./credentials";
import { AxiosInstance } from "axios";
import { Store } from "./store";
export declare class Transport {
    setup: Credentials;
    store: Store | undefined;
    axios: AxiosInstance;
    constructor(setup: Credentials, store?: Store | undefined);
    get baseURL(): "https://app.paydunya.com/sandbox-api/v1" | "https://app.paydunya.com/api/v1";
}

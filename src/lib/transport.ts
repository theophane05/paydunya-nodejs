import { Credentials, PaydunyaEnvironment } from "./credentials";
import axios, {AxiosInstance} from "axios"
import { Store } from "./store";

export class Transport {
    setup: Credentials;
    store: Store | undefined = undefined;
    axios: AxiosInstance;

    constructor(setup: Credentials, store: Store | undefined = undefined) {
        this.setup = setup;
        this.store = store;

        this.axios = axios.create({
            baseURL: this.baseURL
        });

        this.axios.interceptors.request.use((config) => {
            return this.setup.extendRequestConfig(config)
        });
    }

    get baseURL() {
        return this.setup.mode === PaydunyaEnvironment.TEST ? 'https://app.paydunya.com/sandbox-api/v1': 'https://app.paydunya.com/api/v1'
    }

}
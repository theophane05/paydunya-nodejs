import { Setup } from "./credentials";
import axios, {Axios} from "axios"
import { Store } from "./store";

export class PaydunyaClient {
    setup: Setup;
    store?: Store;
    axios: Axios;

    constructor(setup: Setup, store: Store | undefined = undefined) {
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
        return this.setup.mode === "test" ? 'https://app.paydunya.com/sandbox-api/v1': 'https://app.paydunya.com/api/v1'
    }

}
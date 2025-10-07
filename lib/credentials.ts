import axios, {Axios, InternalAxiosRequestConfig} from "axios"
type Environment = "live" | "test"

interface SetupOptions {
    masterKey: string;
    privateKey: string;
    publicKey: string;
    token: string;
    mode: Environment;
}

export class Setup {
    masterKey: string
    privateKey: string
    publicKey: string
    token: string
    mode: Environment

    constructor(options: SetupOptions) {
        this.masterKey = options.masterKey;
        this.privateKey = options.privateKey;
        this.publicKey = options.publicKey;
        this.token = options.token;
        this.mode = options.mode;
    }

    extendRequestConfig(config: InternalAxiosRequestConfig) {
        config.headers
        .set("Content-Type", "application/json")
        .set("PAYDUNYA-MASTER-KEY", this.masterKey)
        .set("PAYDUNYA-PRIVATE-KEY", this.privateKey)
        .set("PAYDUNYA-TOKEN", this.token)
        return config
    }

}



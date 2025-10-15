import { InternalAxiosRequestConfig } from "axios"

export enum PaydunyaEnvironment {
    LIVE = "live",
    TEST = "test"
}

interface CredentialOptions {
    masterKey: string;
    privateKey: string;
    publicKey: string;
    token: string;
    mode: PaydunyaEnvironment;
}

export class Credentials {
    masterKey: string
    privateKey: string
    publicKey: string
    token: string
    mode: PaydunyaEnvironment

    constructor(options: CredentialOptions) {
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



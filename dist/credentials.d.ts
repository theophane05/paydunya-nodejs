import { InternalAxiosRequestConfig } from "axios";
export declare enum PaydunyaEnvironment {
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
export declare class Credentials {
    masterKey: string;
    privateKey: string;
    publicKey: string;
    token: string;
    mode: PaydunyaEnvironment;
    constructor(options: CredentialOptions);
    extendRequestConfig(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig<any>;
}
export {};

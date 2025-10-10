import { InternalAxiosRequestConfig } from "axios";
type Environment = "live" | "test";
interface CredentialOptions {
    masterKey: string;
    privateKey: string;
    publicKey: string;
    token: string;
    mode: Environment;
}
export declare class Credentials {
    masterKey: string;
    privateKey: string;
    publicKey: string;
    token: string;
    mode: Environment;
    constructor(options: CredentialOptions);
    extendRequestConfig(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig<any>;
}
export {};

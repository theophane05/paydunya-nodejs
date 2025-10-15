interface PartialStoreConfiguration {
    tagline: string;
    phone_number: string;
    postal_address: string;
    logo_url: string;
    website_url: string;
    cancel_url: string;
    return_url: string;
    callback_url: string;
}
interface StoreConfiguration extends Partial<PartialStoreConfiguration> {
    name: string;
}
export declare class Store {
    name: string;
    tagline?: string;
    phone_number?: string;
    postal_address?: string;
    logo_url?: string;
    website_url?: string;
    cancel_url?: string;
    return_url?: string;
    callback_url?: string;
    constructor(config: StoreConfiguration);
    get asObject(): Record<string, string>;
}
export {};

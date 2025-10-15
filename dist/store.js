"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    name;
    tagline;
    phone_number;
    postal_address;
    logo_url;
    website_url;
    cancel_url;
    return_url;
    callback_url;
    constructor(config) {
        if (!config || !config.name) {
            throw new Error('Invalid parameters.');
        }
        this.name = config.name;
        if (config.tagline)
            this.tagline = config.tagline;
        if (config.phone_number)
            this.phone_number = config.phone_number;
        if (config.postal_address)
            this.postal_address = config.postal_address;
        if (config.logo_url)
            this.logo_url = config.logo_url;
        if (config.website_url)
            this.website_url = config.website_url;
        if (config.cancel_url)
            this.cancel_url = config.cancel_url;
        if (config.return_url)
            this.return_url = config.return_url;
        if (config.callback_url)
            this.callback_url = config.callback_url;
    }
    get asObject() {
        const obj = { name: this.name };
        if (this.tagline)
            obj.tagline = this.tagline;
        if (this.phone_number)
            obj.phone_number = this.phone_number;
        if (this.postal_address)
            obj.postal_address = this.postal_address;
        if (this.logo_url)
            obj.logo_url = this.logo_url;
        if (this.website_url)
            obj.website_url = this.website_url;
        if (this.cancel_url)
            obj.cancel_url = this.cancel_url;
        if (this.return_url)
            obj.return_url = this.return_url;
        if (this.callback_url)
            obj.callback_url = this.callback_url;
        return obj;
    }
}
exports.Store = Store;

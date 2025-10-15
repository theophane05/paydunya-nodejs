"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
/**
 * Invoice class
 * @param {object} setup Instance of paydunya.Setup
 * @param {object} store Instance of paydunya.Store
 */
class Invoice {
    transport;
    returnURL;
    cancelURL;
    callbackURL;
    description;
    items;
    customData;
    taxes;
    channels;
    totalAmount;
    constructor(transport) {
        this.transport = transport;
        if (transport.store?.return_url)
            this.returnURL = transport.store.return_url;
        if (transport.store?.cancel_url)
            this.cancelURL = transport.store.cancel_url;
        if (transport.store?.callback_url)
            this.callbackURL = transport.store.callback_url;
        this.description = "";
        this.items = {};
        this.customData = {};
        this.taxes = {};
        this.channels = [];
        this.totalAmount = 0;
    }
    get store() {
        return this.transport.store;
    }
    /**
     * Add an item to invoice
     * @param {string} name
     * @param {number} quantity
     * @param {number} unitPrice
     * @param {number} totalPrice
     * @param {string} description
     */
    addItem(name, quantity, unitPrice, totalPrice, description) {
        const position = Object.keys(this.items).length + 1;
        this.items["item_" + position] = {
            name: name,
            quantity: quantity || 0,
            unit_price: unitPrice || 0,
            total_price: totalPrice || 0,
        };
        if (description)
            this.items["item_" + position].description = description;
        return this;
    }
    /**
     * Add a tax
     * @param {string} name
     * @param {number} amount
     */
    addTax(name, amount) {
        const position = Object.keys(this.taxes).length + 1;
        this.taxes["tax_" + position] = {
            name: name,
            amount: Number(amount),
        };
        return this;
    }
    /**
     * Add a payment channel
     * @param {string} channel
     */
    addChannel(channel) {
        this.channels.push(channel);
        return this;
    }
    /**
     * Add many payment channels at once
     * @param {array} channels
     */
    addChannels(channels = []) {
        for (let i = 0; i < channels.length; i++) {
            this.channels.push(channels[i]);
        }
        return this;
    }
    /**
     * Add custom data key, value pairs to request
     * @param {string} title key
     * @param {string} value
     */
    addCustomData(title, value) {
        this.customData[title] = value;
        return this;
    }
    /**
     * Generate the request body
     * @return {object}
     */
    asRequestBody() {
        if (this.totalAmount <= 0)
            throw new Error("Invalid parameters. Initialize Invoice with valid instances of Setup and Store. Total amount must also be set.");
        const body = {
            invoice: {
                total_amount: this.totalAmount,
            },
            actions: undefined,
            custom_data: undefined,
            store: this.store?.asObject,
        };
        if (this.description)
            body.invoice.description = this.description;
        if (Object.keys(this.channels).length > 0)
            body.invoice.channels = this.channels;
        if (Object.keys(this.items).length > 0)
            body.invoice.items = this.items;
        if (this.returnURL || this.cancelURL || this.callbackURL) {
            body.actions = {};
            if (this.returnURL)
                body.actions.return_url = this.returnURL;
            if (this.cancelURL)
                body.actions.cancel_url = this.cancelURL;
            if (this.callbackURL)
                body.actions.callback_url = this.callbackURL;
        }
        if (Object.keys(this.taxes).length > 0)
            body.invoice.taxes = this.taxes;
        if (Object.keys(this.customData).length > 0)
            body.custom_data = this.customData;
        return body;
    }
}
exports.Invoice = Invoice;

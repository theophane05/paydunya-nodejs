import { Transport } from "../transport";
import { PaymentChannel } from "../constants";
interface InvoiceItem {
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    description?: string;
}
interface InvoiceTax {
    name: string;
    amount: number;
}
interface InvoiceData {
    total_amount: number;
    channels: PaymentChannel[];
    items: Record<string, InvoiceItem>;
    description: string;
    taxes: Record<string, InvoiceTax>;
    custom_data: Record<string, any>;
}
/**
 * Invoice class
 * @param {object} setup Instance of paydunya.Setup
 * @param {object} store Instance of paydunya.Store
 */
export declare class Invoice {
    transport: Transport;
    returnURL?: string;
    cancelURL?: string;
    callbackURL?: string;
    description: string;
    items: Record<string, InvoiceItem>;
    customData: Record<string, any>;
    taxes: Record<string, InvoiceTax>;
    channels: PaymentChannel[];
    totalAmount: number;
    constructor(transport: Transport);
    get store(): import("../store").Store | undefined;
    /**
     * Add an item to invoice
     * @param {string} name
     * @param {number} quantity
     * @param {number} unitPrice
     * @param {number} totalPrice
     * @param {string} description
     */
    addItem(name: string, quantity?: number, unitPrice?: number, totalPrice?: number, description?: string): this;
    /**
     * Add a tax
     * @param {string} name
     * @param {number} amount
     */
    addTax(name: string, amount: number): this;
    /**
     * Add a payment channel
     * @param {string} channel
     */
    addChannel(channel: PaymentChannel): this;
    /**
     * Add many payment channels at once
     * @param {array} channels
     */
    addChannels(channels?: PaymentChannel[]): this;
    /**
     * Add custom data key, value pairs to request
     * @param {string} title key
     * @param {string} value
     */
    addCustomData(title: string, value: string): this;
    /**
     * Generate the request body
     * @return {object}
     */
    asRequestBody(): {
        invoice: InvoiceData;
        actions: any;
        custom_data: Record<string, any> | undefined;
        store: Record<string, string> | undefined;
    };
}
export {};

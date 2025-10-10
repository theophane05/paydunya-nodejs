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
export class Invoice {
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

  constructor(transport: Transport) {
    this.transport = transport;

    if (transport.store?.return_url) this.returnURL = transport.store!.return_url;
    if (transport.store?.cancel_url) this.cancelURL = transport.store!.cancel_url;
    if (transport.store?.callback_url)
      this.callbackURL = transport.store!.callback_url;

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
  addItem(
    name: string,
    quantity?: number,
    unitPrice?: number,
    totalPrice?: number,
    description?: string
  ) {
    const position = Object.keys(this.items).length + 1;
    this.items["item_" + position] = {
      name: name,
      quantity: quantity || 0,
      unit_price: unitPrice || 0,
      total_price: totalPrice || 0,
    };
    if (description) this.items["item_" + position]!.description = description;

    return this;
  }

  /**
   * Add a tax
   * @param {string} name
   * @param {number} amount
   */
  addTax(name: string, amount: number) {
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
  addChannel(channel: PaymentChannel) {
    this.channels.push(channel);
    return this;
  }

  /**
   * Add many payment channels at once
   * @param {array} channels
   */
  addChannels(channels: PaymentChannel[] = []) {
    for (let i = 0; i < channels.length; i++) {
      this.channels.push(channels[i]!);
    }

    return this;
  }

  /**
   * Add custom data key, value pairs to request
   * @param {string} title key
   * @param {string} value
   */
  addCustomData(title: string, value: string) {
    this.customData[title] = value;
    return this;
  }

  /**
   * Generate the request body
   * @return {object}
   */
  asRequestBody() {
    if (this.totalAmount <= 0)
      throw new Error(
        "Invalid parameters. Initialize Invoice with valid instances of Setup and Store. Total amount must also be set.\neg: var invoice = new Invoice; invoice.init(setup, store); invoice.setTotalAmount(40)"
      );

    const body = {
      invoice: {
        total_amount: this.totalAmount,
      } as InvoiceData,
      actions: undefined as any,
      custom_data: undefined as Record<string, any> | undefined,
      store: this.store?.asObject,
    };

    if (this.description) body.invoice.description = this.description;
    if (Object.keys(this.channels).length > 0)
      body.invoice.channels = this.channels;
    if (Object.keys(this.items).length > 0) body.invoice.items = this.items;
    if (this.returnURL || this.cancelURL || this.callbackURL) {
      body.actions = {};
      if (this.returnURL) body.actions.return_url = this.returnURL;
      if (this.cancelURL) body.actions.cancel_url = this.cancelURL;
      if (this.callbackURL) body.actions.callback_url = this.callbackURL;
    }
    if (Object.keys(this.taxes).length > 0) body.invoice.taxes = this.taxes;
    if (Object.keys(this.customData).length > 0)
      body.custom_data = this.customData;

    return body;
  }
}

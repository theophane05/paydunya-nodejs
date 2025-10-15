import { config } from "dotenv";
import { join } from "path";
import { PaydunyaClient } from "../src/lib";
import { PaydunyaEnvironment } from "../src/lib/credentials";
import { Store } from "../src/lib/store";
import { PaymentChannel } from "../src/lib/constants";

config({ path: join(__dirname, ".env.local") })

describe('Invoice', function () {

    describe('#addItem()', function () {
        it('should add item to invoice', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.invoiceInstance();
            invoice.addItem('iPhone', 1, 5000, 5000, 'apple gadget');
            expect(invoice.items.item_1?.name).toBe('iPhone');
            expect(invoice.items.item_1?.quantity).toBe(1);
            expect(invoice.items.item_1?.unit_price).toBe(5000);
            expect(invoice.items.item_1?.total_price).toBe(5000);
            expect(invoice.items.item_1?.description).toBe('apple gadget');

            //add another item
            invoice.addItem('Galaxy Phone', 1, 400000, 400000);
            expect(invoice.items.item_2?.name).toBe('Galaxy Phone');
            done();
        });
    });

    describe('#addTax()', function () {
        it('should add tax with valid parameters', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.invoiceInstance();
            invoice.addTax('TVA', 18);
            expect(invoice.taxes.tax_1?.name).toBe('TVA');
            expect(invoice.taxes.tax_1?.amount).toBe(18);
            done();
        })
    });

    describe('#addChannel()', function () {
        it('should add channel with valid parameters', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.invoiceInstance();
            invoice.addChannel(PaymentChannel.WaveCi);
            invoice.addChannel(PaymentChannel.OrangeMoneySenegal);
            expect(invoice.channels[0]).toBe(PaymentChannel.WaveCi);
            expect(invoice.channels[1]).toBe(PaymentChannel.OrangeMoneySenegal);
            done();
        });
    });

    describe('#addChannels()', function () {
        it('should add channels with valid parameters', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.invoiceInstance();
            invoice.addChannels([PaymentChannel.OrangeMoneySenegal, PaymentChannel.Card]);
            expect(invoice.channels[0]).toBe(PaymentChannel.OrangeMoneySenegal);
            expect(invoice.channels[1]).toBe(PaymentChannel.Card);
            done();
        });
    });

    describe('#addCustomData', function () {
        it('should add custom data', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.invoiceInstance();
            invoice.addCustomData('size', 'large');
            expect(invoice.customData.size).toBe('large');
            done();
        });
    });

    describe('#generateRequestBody()', function () {
        it('should fail with invalid parameters', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.invoiceInstance();
            invoice.totalAmount = 50000;
            invoice.addTax('TVA', 18);
            invoice.addCustomData('size', 'large');

            let body = invoice.asRequestBody();

            expect(body.invoice.total_amount).toBe(50000);
            expect(body.store?.name).toBe('Magasin Chez Sandra');
            expect(body.actions.return_url).toBe('http://ma-super-boutique.com/callback');
            expect(body.invoice.taxes.tax_1?.name).toBe('TVA');
            expect(body.invoice.taxes.tax_1?.amount).toBe(18);
            expect(body.custom_data?.size).toBe('large');
            done();
        });
    });

});

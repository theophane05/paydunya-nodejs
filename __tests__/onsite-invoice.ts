import { config } from "dotenv";
import { join } from "path";
import { PaydunyaClient } from "../src/lib";
import { PaydunyaEnvironment } from "../src/lib/credentials";
import { Store } from "../src/lib/store";

/**
 * Onsite Invoice seems to be not working in the test environment
 * The endpoint returns a 404 not found error
 */

config({ path: join(__dirname, ".env.local") })

describe('OnsiteInvoice', function () {
    describe('#create()', function () {
        it('should create onsite payment request and charge', function (done) {
            let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
            client.store = new Store({ name: 'Magasin Chez Sandra', return_url: 'http://ma-super-boutique.com/callback' });
            let invoice = client.onsiteInvoiceInstance();
            invoice.totalAmount = 8000;

            invoice.create('fabrice@gmail.com')
                .then(function () {
                    expect(invoice.oprToken).toBeTruthy();
                    expect(invoice.token).toBeTruthy();
                    expect(invoice.responseText).toBeTruthy();
                    done();
                });
        });
    });
});
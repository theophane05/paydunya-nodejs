import { PaydunyaClient } from '../src/lib';
import { Store } from '../src/lib/store';
import { PaydunyaEnvironment } from '../src/lib/credentials';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, ".env.local") })

describe('CheckoutInvoice', function () {

    let token = '';

    it('should work with valid initialization and total amount', function (done) {
        const client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST)
        client.store = new Store({ name: "Magasin Chez Sandra" })
        const invoice = client.checkoutInvoiceInstance();
        invoice.totalAmount = 1000;

        invoice.create()
            .then((output) => {
                expect(output.url).toBeTruthy()
                expect(output.token).toBeTruthy()
                token = output.token || "";
                done();
            })
            .catch(done);
    });

    it('should confirm completed token', function (done) {

        const client = PaydunyaClient.fromCredentials({
            mode: PaydunyaEnvironment.TEST,
            privateKey: process.env.PAYDUNYA_PRIVATE_KEY || "",
            publicKey: process.env.PAYDUNYA_PUBLIC_KEY || "",
            masterKey: process.env.PAYDUNYA_MASTER_KEY || "",
            token: process.env.PAYDUNYA_TOKEN || ""
        });

        client.store = new Store({ name: "Magasin Chez Sandra" })
        const invoice = client.checkoutInvoiceInstance();

        invoice.getTokenStatus(token)
            .then((result) => {
                expect(result.status).toBeTruthy();
                expect(result.hash).toBeTruthy();
                expect(result.status).toBe("pending");
                done();
            })
            .catch(done);
    });
});
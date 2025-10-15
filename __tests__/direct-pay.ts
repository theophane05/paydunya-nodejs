import { PaydunyaClient } from '../src/lib';
import { PaydunyaEnvironment } from '../src/lib/credentials';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, ".env.local") })

/**
 * Direct Pay endpoint seems to be deprecated. endpoint not found on the server
 */
describe('DirectPay', function () {
    let client = PaydunyaClient.autoDetect(PaydunyaEnvironment.TEST);
    let directPay = client.directpayInstance();

    it('should credit account if initialized correctly', function (done) {
        directPay.creditAccount('maximiliencomlan05@gmail.com', 2000)
            .then(function () {
                expect(directPay.description).toBeTruthy();
                expect(directPay.transactionID).toBeTruthy();
                expect(directPay.responseText).toBeTruthy();
                done();
            });
    });

});
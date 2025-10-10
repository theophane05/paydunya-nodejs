PAYDUNYA NodeJS API Client
======================================
The [Node.JS](http://nodejs.org) library for [PAYDUNYA (paydunya.com)](https://paydunya.com).
Fully supports Typescript.

Built on the PAYDUNYA HTTP API (beta).

## Installation

```javascript
npm install --save paydunya
```

## API configuration

Setup paydunya API keys.

```typescript
import { PaydunyaClient } from "paydunya-sdk"
let client = PaydunyaClient.fromCredentials({
    masterKey: "your-master-key",
    privateKey: "your-private-key",
    publicKey: "your-public-key",
    token: "your-token",
    mode: "test" // or "live"
})
```

### Auto-Detection
It might be suitable for you to put your API configuration in environment variables. 
In that case, instantiate your client with these parameters.

```typescript
import { PaydunyaClient } from "paydunya-sdk"
let client = PaydunyaClient.autoDetect()
```

In that case please pass the following keys in your environment:
- `PAYDUNYA_MASTER_KEY`: the master key of your account,
- `PAYDUNYA_PRIVATE_KEY`: your private key
- `PAYDUNYA_PUBLIC_KEY`: your public key
- `PAYDUNYA_TOKEN`: your paydunya token,
- `PAYDUNYA_MODE`: your current environment. `test` or `live`.
                    

## Checkout Store Configuration

```typescript
import {Store} from "paydunya-sdk/store"
let store = new Store({
  name: 'Magasin Chez Sandra', // only name is required
  tagline: "L'élégance n'a pas de prix",
  phoneNumber: '336530583',
  postalAddress: 'Dakar Plateau - Etablissement kheweul',
  logoURL: 'http://www.chez-sandra.sn/logo.png'
});
```

## Initialize Checkout Invoice

```javascript
var invoice = new paydunya.CheckoutInvoice(setup, store);
```

## Initialize Onsite Invoice

```javascript
var invoice = new paydunya.OnsiteInvoice(setup, store);
```

## Add Invoice Items & Description

```javascript
invoice.addItem('Ordinateur Lenovo L440', 1, 400000, 400000); // name, quantity, unit price, total price
invoice.description = 'Lenovo Product'
```

## Setting Total Amount Chargeable

```javascript
invoice.totalAmount = 400000;
```

## Redirecting to paydunya Checkout
After setting total amount and adding items to your invoice you can create a checkout and redirect the customer. It takes a callback which gets passed the updated invoice object containing the url.

```javascript
invoice.create()
  .then(function (){
    invoice.status;
    invoice.token; // invoice token
    invoice.responseText;
    invoice.url; // PAYDUNYA redirect checkout url
  })
  .catch(function (e) {
    console.log(e);
  });
```

## Onsite Payment Request (OPR): Step 1 - Token request
After setting total amount and adding items to your invoice get the paydunya customer's username or phone number and start an OPR request.

```javascript
invoice.create('alioune@gmail.com')
  .then(function(){
    invoice.oprToken; // You need to pass the OPR Token on Step 2
    invoice.token; // invoice token
    invoice.responseText;
  })
  .catch(function (e) {
    console.log(e);
  });
```


## Onsite Payment Request (OPR): Step 2 - Charge
To successfully complete an OPR charge, you need both your OPR Token & the Confirmation code sent to the customer. After a successfull charge you can programatically access the receipt url, customer information and more.

```javascript
invoice.charge('oprToken', '0000')
  .then(function (){
    invoice.status;
    invoice.responseText;
    invoice.receiptURL;
    invoice.customer; // {name: 'Alioune Badara', phone: '773830279', email: 'alioune@gmail.com'}
  })
  .catch(function (e) {
    console.log(e);
  });
```

## Extra API methods

### Adding Tax Information
You may include tax information on on the checkout page. This information will be available on the invoice & receipt printouts and PDF downloads.

```javascript
invoice.addTax('VAT (18%)', 3000);
invoice.addTax('Autre taxe (5%)', 200);
```

### Adding Custom Data
There are times when you may need to add an extra load of data with the checkout information for later use. paydunya allows saving of custom data on their servers which are persisted even after successful payment.
Note: Custom data is not displayed anywhere on the checkout page, invoice/receipt download & printouts.

```javascript
invoice.addCustomData('CartID', 32393);
invoice.addCustomData('Plan', 'NOEL');
```

### Setting a Cancel URL
You can optionally set the URL where your customers will be redirected to after canceling a checkout.
Note: There are two options as to how the cancel URL is set, one is to set it globally using the checkout setup information and the other is set it as per checkout invoice.
Setting the cancel URL directly on the invoice instance will overwrite the global settings if already set.

```javascript
// Globally
var store = new paydunya.Store({
  name: 'Magasin chez Sandra',
  cancelURL: 'http://www.ma-super-boutique.com/'
});

// Per Checkout
invoice.cancelURL = 'http://www.ma-super-boutique.com/';
```

### Setting a Return URL
PAYDUNYA does a good job of managing receipt downloads and printouts after your customer successfuly makes payment. However there may be cases where you may descide to redirect your customers to another URL after successfully making payment. Return URL guarantees this action.
Note: PAYDUNYA will append `?token=INVOICE_TOKEN` to your URL.

```javascript
// Globally
var store = new paydunya.Store({
  name: 'Magasin chez Sandra',
  returnURL: 'http://www.ma-super-boutique.com/confirm'
});

// Per Checkout
invoice.returnURL = 'http://www.ma-super-boutique.com/confirm';
```

### Confirming a Checkout Programatically
The API allows you to check on the status of any checkout using the checkout token key. You have access to all the data including the receipt download link & customer information in cases where the checkout has been confirmed as completed.

```javascript
var token = 'odaff0a023';

var invoice = new paydunya.CheckoutInvoice(setup, store);

invoice.confirm(token)
  .then(function (){
    invoice.status; //  completed, pending, canceled or fail
    invoice.responseText;

    // available if status == 'completed'
    invoice.customer; // {name: 'Alioune Badara', phone: '772639273', email: 'alioune@gmail.com'}
    invoice.receiptURL; // 'https://app.paydunya.com/sandbox-checkout/receipt/pdf/test_44a6fef19a.pdf'
  })
  .catch(function (e) {
    console.log(e);
  });
```

## DirectPay
You can pay any paydunya account directly via your third party apps. This is particularly excellent for implementing your own Adaptive payment solutions on top of paydunya.

```javascript
var directPay = new paydunya.DirectPay(setup);
directPay.creditAccount('alioune@gmail.com', 5000)
  .then(function (){
    directPay.description;
    directPay.responseText;
    directPay.transactionID;
  })
  .catch(function (e) {
    console.log(e);
  });
```

# Running Tests
To run tests just setup the API configuration environment variables. An internet connection is required for some of the tests to pass.

```javascript
npm install -g mocha
```
Then
`npm test` or `mocha`

## License
MIT
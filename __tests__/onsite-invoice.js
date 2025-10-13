var assert = require('assert')
  , Promise = require('bluebird')
  , Invoice = require('../lib/invoice')
  , paydunya = require('../lib')
  , Setup = paydunya.Setup
  , Store = paydunya.Store
  , OnsiteInvoice = paydunya.OnsiteInvoice
  ;

describe('OnsiteInvoice', function () {
  describe('#create()', function () {
    it('should create onsite payment request and charge', function (done){
      this.timeout(15000);
      var setup = new Setup({mode: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra'});
      var invoice = new OnsiteInvoice(setup, store);
      invoice.totalAmount = 8000;

      invoice.create('fabrice@gmail.com')
      .then(function (){
        assert.ok(invoice.oprToken);
        assert.ok(invoice.token);
        assert.ok(invoice.responseText);
        done();
      });
    });
  });
});
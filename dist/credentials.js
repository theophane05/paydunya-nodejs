"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credentials = exports.PaydunyaEnvironment = void 0;
var PaydunyaEnvironment;
(function (PaydunyaEnvironment) {
    PaydunyaEnvironment["LIVE"] = "live";
    PaydunyaEnvironment["TEST"] = "test";
})(PaydunyaEnvironment || (exports.PaydunyaEnvironment = PaydunyaEnvironment = {}));
class Credentials {
    masterKey;
    privateKey;
    publicKey;
    token;
    mode;
    constructor(options) {
        this.masterKey = options.masterKey;
        this.privateKey = options.privateKey;
        this.publicKey = options.publicKey;
        this.token = options.token;
        this.mode = options.mode;
    }
    extendRequestConfig(config) {
        config.headers
            .set("Content-Type", "application/json")
            .set("PAYDUNYA-MASTER-KEY", this.masterKey)
            .set("PAYDUNYA-PRIVATE-KEY", this.privateKey)
            .set("PAYDUNYA-TOKEN", this.token);
        return config;
    }
}
exports.Credentials = Credentials;
//# sourceMappingURL=credentials.js.map
import { PaydunyaClient } from "../lib";

let client = PaydunyaClient.fromCredentials({
    masterKey: "your-master-key",
    privateKey: "your-private-key",
    publicKey: "your-public-key",
    token: "your-token",
    mode: "test" // or "live"
});
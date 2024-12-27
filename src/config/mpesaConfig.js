// src/config/mpesaConfig.js
class MpesaConfig {
  constructor({
    consumerKey,
    consumerSecret,
    shortCode,
    passkey,
    authUrl,
    stkPushUrl,
    callbackUrl,
    queryUrl,
    transactionDesc,
  }) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.shortCode = shortCode;
    this.passkey = passkey;
    this.authUrl = authUrl;
    this.stkPushUrl = stkPushUrl;
    this.callbackUrl = callbackUrl;
    this.queryUrl = queryUrl;
    this.transactionDesc = transactionDesc || "stk push initiated with PAYMPESA package";
  }
}

module.exports = MpesaConfig;

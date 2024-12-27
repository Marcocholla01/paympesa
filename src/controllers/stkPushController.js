// src/controllers/initiateSTKPush.js
const axios = require("axios");
const {
  generateTimestamp,
  formatPhoneNumber,
} = require("../utils/helperFunctions");
const getAccessToken = require("../middleware/accessToken");

const initiateSTKPush = async (config, { phoneNumber, amount }) => {
  try {
    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);

    // Retrieve access token
    const token = await getAccessToken(
      config.consumerKey,
      config.consumerSecret,
      config.authUrl
    );

    // Format timestamp
    const timestamp = generateTimestamp();

    // Generate password
    const stkPassword = Buffer.from(config.shortCode + config.passkey + timestamp).toString("base64");

    // Prepare STK Push request
    const requestBody = {
      BusinessShortCode: config.shortCode,
      Password: stkPassword,
      Timestamp: timestamp,
      TransactionType: config.transactionType,
      Amount: Number(amount),
      PartyA: String(formattedPhone),
      PartyB: config.shortCode,
      PhoneNumber: String(formattedPhone),
      CallBackURL: config.callbackUrl,
      AccountReference: config.accountReference,
      TransactionDesc: config.transactionDesc,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(config.stkPushUrl, requestBody, { headers });

    return response.data;
  } catch (error) {
    const errorResponse = error.response?.data || {};

    // Throw the error in JSON format
    throw {
      requestId: errorResponse.requestId || "Unknown Request ID",
      errorCode: errorResponse.errorCode || "Unknown Error Code",
      errorMessage:
        errorResponse.errorMessage || error.message || "Unknown Error",
    };
  }
};

module.exports = initiateSTKPush;

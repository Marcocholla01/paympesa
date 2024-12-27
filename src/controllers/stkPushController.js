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
    const stkPassword = Buffer.from(
      config.shortCode + config.passkey + timestamp
    ).toString("base64");

    // Prepare STK Push request
    const requestBody = {
      BusinessShortCode: config.shortCode,
      Password: stkPassword,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: config.shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: config.callbackUrl,
      AccountReference: config.accountReference,
      TransactionDesc: config.transactionDesc,
    };

    const response = await axios.post(config.stkPushUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `STK Push Error: ${error.response?.data?.errorMessage || error.message}`
    );
  }
};

module.exports = initiateSTKPush;

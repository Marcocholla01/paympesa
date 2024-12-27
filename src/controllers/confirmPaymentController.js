// src/controllers/confirmPaymentController.js
const { generateTimestamp } = require("../utils/helperFunctions");
const getAccessToken = require("../middleware/accessToken");

const confirmPayment = async ({
  checkoutRequestID,
  shortCode,
  passkey,
  queryUrl,
  consumerKey,
  consumerSecret,
  authUrl,
}) => {
  try {
    const token = await getAccessToken(consumerKey, consumerSecret, authUrl);
    const timestamp = generateTimestamp();
    const password = Buffer.from(shortCode + passkey + timestamp).toString(
      "base64"
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestID,
    };

    const response = await axios.post(queryUrl, requestBody, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to confirm payment: ${error.message}`);
  }
};

module.exports = confirmPayment;

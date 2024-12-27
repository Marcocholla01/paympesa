// src/middleware/accessToken.js
const axios = require("axios");

const getAccessToken = async (consumerKey, consumerSecret, authUrl) => {
  try {
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const response = await axios.get(authUrl, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.data.access_token) {
      throw new Error("Failed to retrieve access token");
    }

    return response.data.access_token;
  } catch (error) {
    throw new Error(`AccessToken Error: ${error.response?.data?.errorMessage || error.message}`);
  }
};

module.exports = getAccessToken;

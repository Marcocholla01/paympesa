// src/controllers/callbackController.js
const stkPushCallback = (callbackData) => {
  try {
    const resultCode = callbackData.Body.stkCallback.ResultCode;
    if (resultCode !== 0) {
      const errorMessage = callbackData.Body.stkCallback.ResultDesc;
      return {
        success: false,
        message: "Payment not made",
        resultCode,
        resultDesc: errorMessage,
      };
    }

    const { MerchantRequestID, CheckoutRequestID, ResultDesc, CallbackMetadata } = callbackData.Body.stkCallback;

    const amount = CallbackMetadata.Item.find(item => item.Name === "Amount").Value;
    const mpesaCode = CallbackMetadata.Item.find(item => item.Name === "MpesaReceiptNumber").Value;
    const phone = CallbackMetadata.Item.find(item => item.Name === "PhoneNumber").Value;
    const transactionDate = CallbackMetadata.Item.find(item => item.Name === "TransactionDate").Value;

    return {
      success: true,
      message: "Payment received successfully",
      data: {
        MerchantRequestID,
        CheckoutRequestID,
        ResultDesc,
        Amount: amount,
        MpesaReceiptNumber: mpesaCode,
        PhoneNumber: phone,
        TransactionDate: transactionDate,
      }
    };
  } catch (error) {
    throw new Error(`Error processing callback: ${error.message}`);
  }

};

module.exports = stkPushCallback;

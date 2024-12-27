// exports.generateTimestamp = () => {
//   const date = new Date();
//   return (
//     date.getFullYear() +
//     ("0" + (date.getMonth() + 1)).slice(-2) +
//     ("0" + date.getDate()).slice(-2) +
//     ("0" + date.getHours()).slice(-2) +
//     ("0" + date.getMinutes()).slice(-2) +
//     ("0" + date.getSeconds()).slice(-2)
//   );
// };

exports.generateTimestamp = () => {
  return new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
};

exports.formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("0")) {
    return "254" + phoneNumber.slice(1);
  } else if (phoneNumber.startsWith("+")) {
    return phoneNumber.replace("+", "");
  } else if (phoneNumber.startsWith("254")) {
    return phoneNumber;
  } else {
    throw new Error("Invalid phone number format");
  }
};

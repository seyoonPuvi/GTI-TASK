export const checkValidData = (
  showLoginPage,
  email,
  password,
  cardno,
  name
) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isCardNoValid = /^\b(?:\d{4}[- ]?){3}\d{4}\b$/.test(cardno);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  if (!showLoginPage && !isCardNoValid) {
    return "CardNO is required";
  }

  if (!showLoginPage && name === "") {
    return "Name is required";
  }

  return null;
};

export const onRenderCardNo = (cardNo) => {
  switch (cardNo.length) {
    case 1:
      return cardNo.slice(0, 1) + "XXX XXXX XXXX XXXX";

    case 2:
      return cardNo.slice(0, 2) + "XX XXXX XXXX XXXX";

    case 3:
      return cardNo.slice(0, 3) + "X XXXX XXXX XXXX";

    case 4:
      return cardNo.slice(0, 4) + " XXXX XXXX XXXX";

    case 5:
      return cardNo.slice(0, 4) + " " + cardNo.slice(4, 5) + "XXX XXXX XXXX";

    case 6:
      return cardNo.slice(0, 4) + " " + cardNo.slice(4, 6) + "XX XXXX XXXX";

    case 7:
      return cardNo.slice(0, 4) + " " + cardNo.slice(4, 7) + "X XXXX XXXX";

    case 8:
      return cardNo.slice(0, 4) + " " + cardNo.slice(4, 8) + " XXXX XXXX";

    case 9:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 9) +
        "XXX XXXX"
      );

    case 10:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 10) +
        "XX XXXX"
      );

    case 11:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 11) +
        "X XXXX"
      );

    case 12:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 12) +
        " XXXX"
      );

    case 13:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 12) +
        " " +
        cardNo.slice(12, 13) +
        "XXX"
      ); // Full input, no masking

    case 14:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 12) +
        " " +
        cardNo.slice(12, 14) +
        "XX"
      ); // Full input, no masking

    case 15:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 12) +
        " " +
        cardNo.slice(12, 15) +
        "X"
      ); // Full input, no masking

    case 16:
      return (
        cardNo.slice(0, 4) +
        " " +
        cardNo.slice(4, 8) +
        " " +
        cardNo.slice(8, 12) +
        " " +
        cardNo.slice(12, 16)
      ); // Full input, no masking

    default:
      return "XXXX XXXX XXXX XXXX"; // In case of any other length, just use the input
  }
};

export const checkValidPaymentData = (paymentDetails) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(paymentDetails.receiverMail)) {
    return "Please enter a valid email address.";
  }

  // Validate amount
  const amount = parseFloat(paymentDetails.amount);
  if (isNaN(amount) || amount <= 0) {
    return "Please enter a valid positive amount.";
  }

  if (paymentDetails.name === "") {
    return "Please enter a Receiver Name.";
  }

  if (paymentDetails.description === "") {
    return "Please enter a Purpose of Transaction.";
  }

  return null;
};

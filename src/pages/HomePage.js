import React, { useEffect, useState } from "react";
import moment from "moment";
import { ClipLoader } from "react-spinners";

import AccountDetails from "../components/AccountDetails";
import TransactionItem from "../components/TransactionItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  addUserDetails,
  logoutUser,
} from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { checkValidPaymentData } from "../utils/validate";

const HomePage = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.user?.userDetails);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("AD");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    receiverMail: "",
    amount: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!userDetails) {
      const loggedUserEmail = sessionStorage.getItem("loggedUserEmail");
      const usersList = JSON.parse(localStorage.getItem("usersList"));
      const loggedUser = usersList.find((u) => u.email === loggedUserEmail);

      if (loggedUser) {
        dispatch(addUserDetails(loggedUser));
      }
    }
  }, []);

  useEffect(() => {
    setPaymentDetails({
      receiverMail: "",
      amount: "",
      name: "",
      description: "",
    });
    setShowPaymentStatus(false);
  }, [activeTab]);

  const getBalance = () => {
    const initialBalance = parseFloat(userDetails.balance);

    return userDetails.transactionsList.reduce((netChange, transaction) => {
      if (transaction.type === "Credit") {
        return netChange + parseFloat(transaction.amount);
      } else if (transaction.type === "Debit") {
        return netChange - parseFloat(transaction.amount);
      }
      return initialBalance + netChange;
    }, 0);
  };

  const onClickPayBtn = () => {
    // Validate input fields
    const isNotValid = checkValidPaymentData(paymentDetails);
    if (isNotValid) {
      alert(isNotValid);
      return;
    }

    // Get current balance
    const currentBalance = getBalance();

    // Check if the user has sufficient balance for this payment
    const amountToDebit = parseFloat(paymentDetails.amount);
    if (currentBalance < amountToDebit) {
      alert("Insufficient balance!");
      return;
    }

    // Create transactions for both sender and receiver
    const senderTransaction = {
      type: "Debit",
      amount: amountToDebit,
      date: moment().format("DD-MM-YYYY"),
      id: userDetails.transactionsList.length + 1,
      name: paymentDetails.name,
      description: paymentDetails.description,
      email: paymentDetails.receiverMail,
    };

    const receiverTransaction = {
      type: "Credit",
      amount: amountToDebit,
      date: moment().format("DD-MM-YYYY"),
      id: new Date().getTime(), // Unique ID for receiver's transaction
      name: userDetails.name,
      description: paymentDetails.description,
      email: userDetails.email,
    };

    // Update Redux: Add transactions
    dispatch(addTransaction(senderTransaction));

    // Update localStorage with the new transactions
    const usersList = JSON.parse(localStorage.getItem("usersList"));

    const updatedUsersList = usersList.map((user) => {
      // Update sender's transactions
      if (user.email === userDetails.email) {
        return {
          ...user,
          transactionsList: [senderTransaction, ...user.transactionsList],
        };
      }

      // Update receiver's transactions
      if (user.email === paymentDetails.receiverMail) {
        return {
          ...user,
          transactionsList: [receiverTransaction, ...user.transactionsList],
        };
      }

      return user;
    });

    // Show payment status
    setShowPaymentStatus(true);
    setPaymentStatus("processing");

    setTimeout(() => {
      setPaymentStatus("success");
    }, 3000);

    // Save updated data to localStorage
    localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
  };

  const onClickLogout = () => {
    dispatch(logoutUser());
    sessionStorage.removeItem("loggedUserEmail");
    navigate("/");
  };

  const onRenderHomePageAd = () => (
    <div className="w-[50%]  flex-grow">
      <img
        src="https://web-images.credcdn.in/v2/_next/assets/images/landing/datasafe.png"
        alt="secure-icon"
        className="h-20 w-20 object-contain object-center m-auto"
      />
      <h3 className="text-white text-3xl font-mono text-center mt-4">
        your data isn't our business. keeping it safe is.
      </h3>
      <div className="ad-desc font-extrabold text-6xl mt-3">
        all your personal data and <br />
        transactions are encrypted and <br />
        secured. there's no room for mistakes <br />
        because we didn't leave any.
      </div>
    </div>
  );

  const onRenderHeader = () => (
    <div className=" py-2 px-6 flex justify-between items-center">
      <h1 className="text-6xl font-bold tracking-wider z-50 relative">GTI</h1>
      <button
        onClick={() => onClickLogout()}
        className="py-2 px-6 text-3xl  font-bold rounded-md cursor-pointer z-50"
      >
        Logout
      </button>
    </div>
  );

  const onRenderVedioBackground = () => (
    <div className="h-full w-full absolute">
      <video
        autoPlay
        loop
        muted
        className=" fixed top-0 left-0 w-full h-full -z-10 object-cover "
        src="https://web-images.credcdn.in/v2/_next/assets/videos/landing/desktop/rewards-desktop-final.mp4?tr=q-95"
      />
    </div>
  );
  const onRenderPay = () => (
    <div className="flex w-[50%] flex-grow justify-between  ">
      <div className="w-[45%] h-[480px]  border-[1px] border-solid border-[#1A1B1B] rounded-xl px-6 py-4">
        <h3 className="text-4xl font-mono tracking-wider text-green-900 text-center">
          Make Payment
        </h3>
        <form
          className="flex flex-col gap-y-4  h-full mt-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Enter the Receiver Email ID"
            value={paymentDetails.receiverMail}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                receiverMail: e.target.value,
              })
            }
            className="w-[100%] h-12 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
          />
          <input
            type="text"
            placeholder="Name of the Receiver"
            value={paymentDetails.name}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                name: e.target.value,
              })
            }
            className="w-[100%] h-12 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
          />
          <input
            type="text"
            placeholder="Enter Amount to Send"
            value={paymentDetails.amount}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                amount: parseFloat(e.target.value) || "",
              })
            }
            className="w-[100%] h-12 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={paymentDetails.description}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                description: e.target.value,
              })
            }
            className="w-[100%] h-12 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
          />
          <button
            onClick={(e) => onClickPayBtn(e)}
            className="w-full h-12 bg-green-600 pay-btn-grad text-2xl text-white font-thin rounded-md tracking-wide cursor-pointer"
          >
            Pay
          </button>

          <div className="flex justify-between items-center mt-5">
            <button
              onClick={() => {
                setPaymentDetails({
                  receiverMail: "",
                  amount: "",
                });
                setShowPaymentStatus(false);
              }}
              className="h-8 w-32 pay-btn-grad text-sm text-white font-thin rounded-md tracking-wide cursor-pointer"
            >
              New Payment
            </button>
            <button
              onClick={() => {
                setActiveTab("AD");
                setShowPaymentStatus(false);
              }}
              className="h-8 w-32 home-page text-lg text-white font-thin rounded-md tracking-wide cursor-pointer"
            >
              Return
            </button>
          </div>
        </form>
      </div>
      {showPaymentStatus && onRenderPaymentStatus()}
    </div>
  );
  const onRenderSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="#36D7B7" loading={true} size={50} />
    </div>
  );
  const onRenderPaymentStatus = () => (
    <div className="w-[45%] h-[480px]  border-[1px] border-solid border-[#1A1B1B] rounded-xl px-6 py-6">
      <h3 className="text-4xl font-mono tracking-wider text-yellow-900 text-center">
        Payment Status
      </h3>
      {paymentStatus !== "processing" ? (
        <div className="flex flex-col gap-y-6 justify-center h-full">
          <p className="text-gray-500 text-2xl font-mono">
            TransactionState:
            <span className="text-white font-thin text-lg">Completed✅</span>
          </p>
          <p className="text-gray-500 text-2xl font-mono">
            TransactionID:
            <span className="text-white font-thin text-lg">{Date.now()}</span>
          </p>
          <p className="text-gray-500 text-2xl font-mono">
            TransactionDATE:
            <span className="text-white text-lg font-thin">
              {moment().format("DD/MM/YYYY")}
            </span>
          </p>
          <p className="text-gray-500 text-2xl font-mono">
            Sender:
            <span className="text-white font-thin text-lg">
              {userDetails.email}
            </span>
          </p>
          <p className="text-gray-500 text-2xl font-mono">
            Receiver:
            <span className="text-white font-thin text-lg">
              {paymentDetails.receiverMail}
            </span>
          </p>
          <p className="text-gray-500 text-2xl font-mono">
            Amount Sent:
            <span className="text-white font-thin text-lg">
              {paymentDetails.amount}rs
            </span>
          </p>
        </div>
      ) : (
        onRenderSpinner()
      )}
    </div>
  );

  const onRenderTransaction = () => (
    <div className="w-[50%] h-[480px] flex-grow border-[1px] border-solid border-[#1A1B1B] rounded-xl">
      <div className="flex justify-between items-center p-2">
        <h3 className="text-lg font-mono tracking-wider">
          Transaction History
        </h3>
        <button
          className="text-xl text-gray-400 hover:text-gray-600"
          onClick={() => setActiveTab("AD")}
        >
          ❌
        </button>
      </div>
      <ul className="overflow-y-auto h-[430px] scrollbar-hidden">
        {userDetails.transactionsList.map((each, index) => (
          <TransactionItem key={each.id} data={each} index={index} />
        ))}
      </ul>
    </div>
  );

  const onRenderActiveTab = () => {
    switch (activeTab) {
      case "TRANS":
        return onRenderTransaction();
      case "PAY":
        return onRenderPay();
      default:
        return onRenderHomePageAd();
    }
  };
  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col text-white font-extrabold">
      {onRenderHeader()}
      {onRenderVedioBackground()}
      <div className="bg-black opacity-95 w-[90%] h-[80vh] px-8 py-6 mt-10 rounded-xl m-auto relative">
        <h1 className="text-center text-xl font-light mb-14 tracking-widest font-sans">
          Welcome To Your Dashboard ✨
        </h1>
        <div className="flex w-full ">
          {userDetails && (
            <AccountDetails
              setActiveTab={setActiveTab}
              balance={getBalance()}
              userDetails={userDetails}
            />
          )}
          {onRenderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

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
import HomePageAD from "../components/HomePageAD";
import Payment from "../components/Payment";

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
  }, [dispatch, userDetails]);

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

  const onRenderHeader = () => (
    <div className=" py-2 px-6 flex justify-between items-center">
      <h1 className="text-2xl md:text-6xl font-bold tracking-wider z-50 relative">
        GTI
      </h1>
      <button
        onClick={() => onClickLogout()}
        className="py-2 px-6 text-xl md:text-3xl  font-bold rounded-md cursor-pointer z-50"
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

  const onRenderSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="#36D7B7" loading={true} size={50} />
    </div>
  );
  const onRenderPaymentStatus = () => (
    <div className="w-full md:w-[50%] h-[480px]  border-[1px] border-solid border-[#1A1B1B] rounded-xl px-2 py-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-mono tracking-wider text-yellow-900 text-center">
          Payment Status
        </h3>
        <button className="" onClick={() => setShowPaymentStatus(false)}>
          ❌
        </button>
      </div>
      {paymentStatus !== "processing" ? (
        <div className="flex flex-col gap-y-6 justify-center h-full">
          <p className="text-gray-500 text-[16px] font-mono">
            TransactionState:
            <span className="text-white font-thin text-sm">Completed✅</span>
          </p>
          <p className="text-gray-500 text-[16px] font-mono">
            TransactionID:
            <span className="text-white font-thin text-sm">{Date.now()}</span>
          </p>
          <p className="text-gray-500 text-[16px] font-mono">
            TransactionDATE:
            <span className="text-white text-sm font-thin">
              {moment().format("DD/MM/YYYY")}
            </span>
          </p>
          <p className="text-gray-500 text-[16px] font-mono">
            Sender:
            <span className="text-white font-thin text-sm">
              {userDetails.email}
            </span>
          </p>
          <p className="text-gray-500 text-[16px] font-mono">
            Receiver:
            <span className="text-white font-thin text-sm">
              {paymentDetails.receiverMail}
            </span>
          </p>
          <p className="text-gray-500 text-[16px] font-mono">
            Amount Sent:
            <span className="text-white font-thin text-sm">
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
        return (
          <Payment
            showPaymentStatus={showPaymentStatus}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            onClickPayBtn={onClickPayBtn}
            setShowPaymentStatus={setShowPaymentStatus}
            setActiveTab={setActiveTab}
            onRenderPaymentStatus={onRenderPaymentStatus}
          />
        );
      default:
        return <HomePageAD />;
    }
  };
  return (
    <div className="min-h-screen h-full w-full  flex flex-col text-white font-extrabold pb-10">
      {onRenderHeader()}
      {onRenderVedioBackground()}
      <div className="bg-black opacity-95 w-full sm:w-[90%] px-2 sm:px-8 py-5 sm:py-10 mt-5 sm:mt-10 rounded-xl m-auto relative">
        <h1 className="text-center text-xl font-light mb-3 sm:mb-14 tracking-widest font-sans">
          Welcome To Your Dashboard ✨
        </h1>
        <div className="flex w-full justify-between">
          {userDetails && (
            <AccountDetails
              setActiveTab={setActiveTab}
              balance={getBalance()}
              userDetails={userDetails}
              activeTab={activeTab}
            />
          )}
          {onRenderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

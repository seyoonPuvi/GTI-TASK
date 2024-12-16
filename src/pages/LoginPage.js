import React, { useEffect, useState } from "react";
import { checkValidData } from "../utils/validate";
import LoginAccountPage from "../components/LoginAccountPage";
import CreateAccountPage from "../components/CreateAccountPage";
import {
  DUMMY_TRANSACTIONS,
  INITIAL_BALANCE,
  monthsList,
  yearsList,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../utils/store/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig/firebase";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isGetStartedBtnClicked, setGetStartBtn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userInputDetails, setUserInputDetails] = useState({
    email: "",
    password: "",
    cardNo: "",
    expiryMonth: monthsList[0],
    expiryYear: yearsList[0],
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and navigate to home page
    const loggedInUser = sessionStorage.getItem("loggedUserEmail");
    if (loggedInUser) {
      navigate("/home");
    }
  }, [dispatch, navigate]);

  const onHandleNewUser = (user) => {
    const { email, password, cardNo, expiryMonth, expiryYear, name } =
      userInputDetails;
    const newUser = {
      id: user.uid,
      email,
      password,
      cardNo,
      expiryMonth,
      expiryYear,
      name,
      balance: INITIAL_BALANCE,
      transactionsList: DUMMY_TRANSACTIONS,
    };
    dispatch(addUserDetails(newUser));
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    usersList.push(newUser);
    localStorage.setItem("usersList", JSON.stringify(usersList));
  };

  const onHandleExistingUser = (uid) => {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const user = usersList.find((u) => u.id === uid);
    if (user) {
      dispatch(addUserDetails(user));
      navigate("/home");
    } else {
      setErrorMsg("User not found");
    }
  };

  const onClickCreateBtn = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const errorMsg = checkValidData(
      showLoginPage,
      userInputDetails.email,
      userInputDetails.password,
      userInputDetails.cardNo,
      userInputDetails.name
    );
    if (errorMsg) {
      setErrorMsg(errorMsg);
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      userInputDetails.email,
      userInputDetails.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        onHandleNewUser(user);
        sessionStorage.setItem("loggedUserEmail", user.email);
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const onClickLoginBtn = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const errorMsg = checkValidData(
      showLoginPage,
      userInputDetails.email,
      userInputDetails.password
    );

    if (errorMsg) {
      setErrorMsg(errorMsg);
      return;
    }

    signInWithEmailAndPassword(
      auth,
      userInputDetails.email,
      userInputDetails.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        onHandleExistingUser(user.uid);
        sessionStorage.setItem("loggedUserEmail", user.email);
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const onRendergetStartedPage = () => (
    <div className=" w-full mt-32 text-center text-white">
      <h1 className="text-9xl  title font-extrabold tracking-wider ">
        crafted for the
        <br />
        creditworthy
      </h1>
      <p className="text-2xl mt-5">
        GTI is a members-only club that enables the <br /> trustworthy to make
        financial progress
      </p>

      <button
        className="py-2 px-6 getstarted-btn  mt-24 text-2xl font-bold rounded-md"
        onClick={() => setGetStartBtn(true)}
      >
        Get Started
      </button>
    </div>
  );

  const onRenderCreateAccountPage = () => (
    <CreateAccountPage
      userInputDetails={userInputDetails}
      setShowLoginPage={setShowLoginPage}
      setUserInputDetails={setUserInputDetails}
      onClickCreateBtn={onClickCreateBtn}
      errorMsg={errorMsg}
    />
  );

  const onRenderLoginAccountPage = () => (
    <LoginAccountPage
      setShowLoginPage={setShowLoginPage}
      onClickLoginBtn={onClickLoginBtn}
      errorMsg={errorMsg}
      userInputDetails={userInputDetails}
      setUserInputDetails={setUserInputDetails}
    />
  );

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full absolute">
        <video
          autoPlay
          loop
          muted
          className="fixed top-0 left-0 w-full h-full -z-10 object-cover"
          src="https://web-images.credcdn.in/v2/_next/assets/videos/landing/desktop/hero-desktop.mp4?tr=q-95"
        />
      </div>
      <h1 className="text-6xl text-white font-bold tracking-wider z-50 relative p-4">
        GTI
      </h1>
      {!isGetStartedBtnClicked
        ? onRendergetStartedPage()
        : showLoginPage
        ? onRenderLoginAccountPage()
        : onRenderCreateAccountPage()}
    </div>
  );
};

export default LoginPage;

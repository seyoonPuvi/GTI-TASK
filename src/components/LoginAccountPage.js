import React, { useState } from "react";
import { monthsList, yearsList } from "../utils/constants";

const LoginAccountPage = ({
  setShowLoginPage,
  onClickLoginBtn,
  errorMsg,
  userInputDetails,
  setUserInputDetails,
}) => {
  const [showPassword, toggleShowPassword] = useState(false);
  return (
    <div className="h-[70%] w-full flex justify-center items-center">
      <div className="bg-black w-[40%] h-[90%] opacity-85 rounded-lg px-4 py-6 flex flex-col items-center justify-center">
        <h3 className="text-white text-4xl font-mono">Login Your Account</h3>
        <p className="font-thin text-gray-100 px-4 py-2">
          Don't you have an Account?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setUserInputDetails({
                email: "",
                password: "",
                cardNo: "",
                expiryMonth: monthsList[0],
                expiryYear: yearsList[0],
                name: "",
              });
              setShowLoginPage(false);
            }}
          >
            {" "}
            CreateAccount
          </span>
        </p>
        <form className="mt-8 text-black flex flex-col gap-y-4 w-[90%]">
          <input
            type="email"
            placeholder="Enter Email ID"
            className="w-[100%] h-12 rounded-lg bg-slate-200 px-4  font-mono text-xl outline-none"
            value={userInputDetails.email}
            onChange={(e) =>
              setUserInputDetails({
                ...userInputDetails,
                email: e.target.value,
              })
            }
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-[100%] h-12 rounded-lg bg-slate-200 px-4  font-mono text-xl outline-none"
            value={userInputDetails.password}
            onChange={(e) =>
              setUserInputDetails({
                ...userInputDetails,
                password: e.target.value,
              })
            }
          />
          <div className="flex items-center gap-x-2 px-2">
            <input
              type="checkbox"
              id="showPassword"
              onClick={() => toggleShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              className="text-white text-lg font-mono"
            >
              ShowPassword
            </label>
          </div>
          <button
            className="btn-grad w-[100%] h-12"
            onClick={(e) => onClickLoginBtn(e)}
          >
            Login
          </button>
          {errorMsg && (
            <p className="text-sm text-red-600 text-center">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginAccountPage;

import React from "react";
import { onRenderCardNo } from "../utils/validate";
import { monthsList, yearsList } from "../utils/constants";

const CreateAccountPage = ({
  userInputDetails,
  setShowLoginPage,
  setUserInputDetails,
  onClickCreateBtn,
  errorMsg,
}) => {
  return (
    <div className="flex justify-end bg-black opacity-85 rounded-lg w-[65%] h-[80%] m-auto p-4">
      <div className="text-white w-[50%] h-full flex justify-center items-center">
        <div className="debit-card-bg h-[40%] w-[80%] rounded-xl px-4 py-1">
          <img
            src="https://i.postimg.cc/NFyPXShy/visa.png"
            alt="mastercard-icon"
            className="ml-auto h-10 w-16"
          />
          <img
            src="https://i.postimg.cc/y6MzPXfq/chip.png"
            alt="chip-icon"
            className="h-[30px] w-[40px] object-cover rounded-lg"
          />
          <h3 className="text-white font-mono text-3xl mt-2 tracking-wide">
            {userInputDetails.cardNo
              ? onRenderCardNo(userInputDetails.cardNo)
              : "XXXX XXXX XXXX XXXX"}
          </h3>
          <div className="pt-1 text-center ml-10">
            <span className="text-[10px]">VALID THRU</span>
            <h3>
              {userInputDetails.expiryMonth}/ {userInputDetails.expiryYear}
            </h3>
          </div>
          <h3 className="text-white font-mono text-2xl mt-2 tracking-wider overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
            {userInputDetails.name.split(" ").join("").toUpperCase()}
          </h3>
        </div>
      </div>
      <div className="text-white w-[50%] px-4">
        <h3 className="text-white text-5xl font-mono pt-6">
          Create an account
        </h3>
        <p className="font-thin text-gray-100 px-4 py-2">
          Already have an Account?
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
              setShowLoginPage(true);
            }}
          >
            {" "}
            Login
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
            type="text"
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

          <div className="py-4 flex flex-col gap-y-4">
            <p className="text-white text-2xl font-mono">
              Enter Your Card Details
            </p>
            <input
              type="text"
              placeholder="Enter Your 16digit Card No"
              className="w-[100%] h-12 rounded-lg bg-slate-200 px-4 font-mono text-xl outline-none"
              value={userInputDetails.cardNo}
              onChange={(e) =>
                setUserInputDetails({
                  ...userInputDetails,
                  cardNo: e.target.value.split(" ").join(""),
                })
              }
            />
            <div className="text-white flex gap-x-8 font-thin px-2">
              <label>Expiry Date</label>
              <div className="flex gap-x-8">
                <select
                  className="text-black p-2 bg-slate-200"
                  value={userInputDetails.expiryMonth}
                  onChange={(e) =>
                    setUserInputDetails({
                      ...userInputDetails,
                      expiryMonth: e.target.value,
                    })
                  }
                >
                  {monthsList.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <p className="text-3xl">/</p>
                <select
                  className="text-black bg-slate-200 p-2"
                  value={userInputDetails.expiryYear}
                  onChange={(e) =>
                    setUserInputDetails({
                      ...userInputDetails,
                      expiryYear: e.target.value,
                    })
                  }
                >
                  {yearsList.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="text"
              placeholder="Name On The Card"
              className="w-[100%] h-12 rounded-lg bg-slate-200 px-4 font-mono text-xl outline-none"
              value={userInputDetails.name}
              onChange={(e) =>
                setUserInputDetails({
                  ...userInputDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <button
            className="btn-grad w-[100%] h-12"
            onClick={(e) => onClickCreateBtn(e)}
          >
            Create
          </button>
          {errorMsg && (
            <p className="text-sm text-red-600 text-center">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;

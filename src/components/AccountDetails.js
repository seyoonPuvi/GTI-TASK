import React from "react";
import { onRenderCardNo } from "../utils/validate";

const AccountDetails = ({ setActiveTab, userDetails, balance }) => {
  return (
    <div className="h-full w-[35%]  text-white  pb-5">
      <div className="home-page h-[33%] w-[95%] rounded-xl px-4 py-1 shadow-xl">
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
          {onRenderCardNo(userDetails.cardNo)}
        </h3>
        <div className="pt-1 text-center ml-10">
          <span className="text-[10px]">VALID THRU</span>
          <h3>
            {userDetails.expiryMonth} / {userDetails.expiryYear}
          </h3>
        </div>
        <h3 className="text-white font-mono text-2xl mt-2 tracking-wider overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
          {userDetails.name}
        </h3>
      </div>
      <div className="flex gap-x-7 mt-5">
        <div className="bg-white  h-32 w-[45%] px-6  shadow-lg rounded-2xl flex flex-col justify-center items-center">
          <h3 className="text-4xl text-black font-thin">Balance</h3>
          <h2 className="text-2xl text-green-500 font-mono">{balance}rs</h2>
        </div>
        <button
          className=" h-32 w-[45%] px-6 pay-btn-grad shadow-lg rounded-2xl flex flex-col justify-center items-center"
          onClick={() => setActiveTab("PAY")}
        >
          <h3 className="text-4xl text-white font-mono">+</h3>
          <h2 className="text-2xl text-white font-thin">PAY</h2>
        </button>
      </div>
      <button
        className="mt-8 home-page opacity-85 w-[95%] rounded-2xl py-6 px-6 text-xl"
        onClick={() => setActiveTab("TRANS")}
      >
        Transactions
      </button>
    </div>
  );
};

export default AccountDetails;

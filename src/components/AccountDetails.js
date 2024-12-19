import React, { useEffect, useState } from "react";
import { onRenderCardNo } from "../utils/validate";

const AccountDetails = ({ setActiveTab, userDetails, balance, activeTab }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleSize = () => setIsSmallScreen(mediaQuery.matches);
    handleSize();
    mediaQuery.addEventListener("change", handleSize);

    return () => mediaQuery.removeEventListener("change", handleSize);
  });

  const shouldDisplay =
    !(activeTab === "PAY" || activeTab === "TRANS") || !isSmallScreen;

  return (
    <>
      {shouldDisplay && (
        <div className="h-full w-full md:w-[60%] xl:w-[40%] m-auto  xl:m-0 text-white  pb-5 ">
          <div className="home-page h-[200px] sm:h-[33%] w-full md:w-full xl:w-[400px] rounded-xl px-2 sm:px-4 py-1 shadow-xl">
            <img
              src="https://i.postimg.cc/NFyPXShy/visa.png"
              alt="mastercard-icon"
              className="ml-auto h-5 sm:h-10 w-8 sm:w-16"
            />
            <img
              src="https://i.postimg.cc/y6MzPXfq/chip.png"
              alt="chip-icon"
              className=" h-[30px] w-[30px] sm:h-[30px] sm:w-[40px] object-cover rounded-lg"
            />
            <h3 className="text-white font-mono text-2xl sm:text-3xl mt-2 tracking-wide">
              {onRenderCardNo(userDetails.cardNo)}
            </h3>
            <div className="pt-1 text-center ml-10">
              <span className="text-[10px] font-thin">VALID THRU</span>
              <h3 className="font-thin text-[10px]">
                {userDetails.expiryMonth} / {userDetails.expiryYear}
              </h3>
            </div>
            <h3 className="text-white font-thin text-2xl mt-2 tracking-wider overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
              {userDetails.name.toUpperCase()}
            </h3>
          </div>
          <div className="flex gap-x-7 mt-5 w-full">
            <div className="bg-white  h-28 sm:h-32 w-[48%] xl:w-[185px] px-6  shadow-lg rounded-2xl flex flex-col justify-center items-center">
              <h3 className="text-4xl text-black font-thin">Balance</h3>
              <h2 className="text-2xl text-green-500 font-mono">{balance}rs</h2>
            </div>
            <button
              className=" h-28 sm:h-32 w-[48%] xl:w-[185px] px-6 pay-btn-grad shadow-lg rounded-2xl flex flex-col justify-center items-center"
              onClick={() => setActiveTab("PAY")}
            >
              <h3 className="text-4xl text-white font-mono">+</h3>
              <h2 className="text-2xl text-white font-thin">PAY</h2>
            </button>
          </div>
          <button
            className="mt-8 home-page opacity-85 w-full xl:w-[400px] rounded-2xl py-6 px-6 text-xl"
            onClick={() => setActiveTab("TRANS")}
          >
            Transactions
          </button>
        </div>
      )}
    </>
  );
};

export default AccountDetails;

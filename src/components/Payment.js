import React from "react";

const Payment = ({
  showPaymentStatus,
  paymentDetails,
  setPaymentDetails,
  onClickPayBtn,
  setShowPaymentStatus,
  setActiveTab,
  onRenderPaymentStatus,
}) => {
  return (
    <div className="flex w-full md:w-[50%] flex-grow justify-between  ">
      {!showPaymentStatus && (
        <div className="w-full md:w-[50%] h-[480px]  border-[1px] border-solid border-[#1A1B1B] rounded-xl py-4">
          <h3 className="text-2xl font-mono tracking-wider text-green-900 text-center">
            Make Payment
          </h3>
          <form
            className="flex flex-col gap-y-4  h-full mt-8 px-4"
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
              className="w-[100%] h-10 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
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
              className="w-[100%] h-10 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
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
              className="w-[100%] h-10 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
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
              className="w-[100%] h-10 rounded-lg bg-slate-200 px-4 text-black font-thin text-lg outline-none"
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
                className="h-8 w-20 pay-btn-grad text-[10px] text-white font-thin rounded-md tracking-wide cursor-pointer"
              >
                New Payment
              </button>
              <button
                onClick={() => {
                  setActiveTab("AD");
                  setShowPaymentStatus(false);
                }}
                className="h-8 w-20 home-page text-[sm] text-white font-thin rounded-md tracking-wide cursor-pointer"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      )}
      {showPaymentStatus && onRenderPaymentStatus()}
    </div>
  );
};

export default Payment;

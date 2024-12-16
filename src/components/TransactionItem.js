import React from "react";

const TransactionItem = ({ data, index }) => {
  return (
    <li className="flex border-t-[1px] border-[#1A1B1B] text-white font-thin">
      <div className="py-2 text-sm w-1/12 text-center">{index + 1}</div>
      <div className="py-2 text-sm w-1/12 text-center">{data.date}</div>
      <div
        className={`py-2 text-sm w-1/12 text-center ${
          data.type === "Credit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {data.type}
      </div>
      <div className="py-2 text-sm w-2/12 text-center">{data.name}</div>
      <div className="py-2 text-sm w-3/12 text-center truncate overflow-hidden whitespace-nowrap">
        {data.email}
      </div>
      <div className="py-2 text-sm w-3/12 text-center truncate overflow-hidden whitespace-nowrap">
        {data.description}
      </div>
      <div
        className={`py-2 text-sm w-1/12 text-center ${
          data.type === "Credit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {data.amount}
      </div>
    </li>
  );
};

export default TransactionItem;

import React from "react";

const TransactionItem = ({ data, index }) => {
  return (
    <li className="flex border-t-[1px] border-[#1A1B1B] text-white font-bold">
      <div className="py-2 text-[10px] w-1/12 text-center">{index + 1}</div>
      <div className="py-2 text-[8px] w-1/12 text-center">{data.date}</div>
      <div
        className={`py-2 text-[10px] w-2/12 md:w-1/12 text-center ${
          data.type === "Credit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {data.type}
      </div>

      <div className="py-2 text-[10px] w-4/12 md:w-2/12 text-center truncate overflow-hidden whitespace-nowrap">
        {data.name}
        <div className="py-2 text-[10px]  text-center truncate overflow-hidden whitespace-nowrap md:hidden">
          {data.email}
        </div>
      </div>
      <div className="py-2 text-[10px] w-3/12 text-center hidden md:block truncate overflow-hidden whitespace-nowrap">
        {data.email}
      </div>
      <div className="py-2 text-[10px] w-3/12 text-center truncate overflow-hidden whitespace-nowrap">
        {data.description}
      </div>
      <div
        className={`py-2 text-[10px] w-1/12 text-center ${
          data.type === "Credit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {data.amount}
      </div>
    </li>
  );
};

export default TransactionItem;

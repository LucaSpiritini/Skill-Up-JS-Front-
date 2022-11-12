import React from "react";

export const Paginate = ({ totalPages, changePage }) => {
  return (
    <>
      {Array.from(Array(totalPages).keys()).map((nro) => (
        <button
          className="bg-black text-white py-2 px-4 mx-1 hover:bg-gray-500 duration-300 font-bold rounded-xl"
          onClick={() => changePage(nro)}
          key={nro}
        >
          {nro + 1}
        </button>
      ))}
    </>
  );
};

import React from "react";

export const Paginate = ({ totalPages, changePage }) => {
  return (
    <>
      {Array.from(Array(totalPages).keys()).map((nro) => (
        <button
          className="bg-black text-white py-3 px-5 mx-1 font-bold rounded-xl"
          onClick={() => changePage(nro)}
          key={nro}
        >
          {nro + 1}
        </button>
      ))}
    </>
  );
};

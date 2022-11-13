import React from "react";

export const Table = ({ children }) => {
  return (
    <>
      <div className="mx-auto rounded-lg p-1 md:p-2">
        <table className="table-layout border-separate w-full">
          <thead className="text-center">
            <tr>
              <th>Nº</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};

import React from "react";
import format from "date-format";
export const SingleRow = ({ transaction }) => {
  const parseDate = (date) => {
    const newDate = new Date(date);
    return format("dd/MM/yy", newDate);
  };
  return (
    <tr className="text-center">
      <td>{transaction?.id}</td>
      <td>{transaction?.description}</td>
      <td>
        {transaction?.Category.name === "Incomes" ? (
          <span className="text-green-400">+{transaction?.amount}</span>
        ) : (
          <span className="text-red-400">-{transaction?.amount}</span>
        )}
      </td>
      <td className="text-center">{parseDate(transaction?.date)}</td>
    </tr>
  );
};

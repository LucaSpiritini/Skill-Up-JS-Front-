import React from "react";
import format from "date-format";
import Boton from "../Boton";
import { useNavigate } from "react-router-dom";


export const SingleRow = ({ transaction }) => {
  const navigate = useNavigate();
  const parseDate = (date) => {
    const newDate = new Date(date);
    return format("dd/MM/yy", newDate);
  };
const edit = () =>{
  navigate(`/edit-${transaction.id}` )
}

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
      <div className="flex ml-3">
        <button onClick={edit}>
      <Boton text="edit" />
      </button>
      <Boton text="cancel"/>
      </div>
    </tr>
  );
};

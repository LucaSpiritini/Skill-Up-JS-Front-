import React from "react";
import format from "date-format";
import ButtonComponent from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
export const SingleRow = ({ transaction }) => {
  const navigate = useNavigate();
  const parseDate = (date) => {
    const newDate = new Date(date);
    return format("dd/MM/yy", newDate);
  };
  const edit = () => {
    navigate(`/edit-${transaction.id}`);
  };

  const formatCurrency = (currency, amount) => {
    const currencyMap = new Map([
      ["pesos", "$", "euros", "€", "dolares", "U$D"],
    ]);
    return ` ${currencyMap.get(currency)}${amount}`;
  };

  return (
    <tr className="text-center">
      <td>{transaction?.id}</td>
      <td>{transaction?.description}</td>
      <td>
        {transaction?.categoryId === 1 ? (
          <span className="text-green-400">
            +{formatCurrency(transaction?.currency, transaction?.amount)}
          </span>
        ) : (
          <span className="text-red-400">
            -{formatCurrency(transaction?.currency, transaction?.amount)}
          </span>
        )}
      </td>
      <td className="text-center">{parseDate(transaction?.date)}</td>
      <td>
        <ButtonComponent icon={<AiOutlineEdit />} />
      </td>
      <td>
        <ButtonComponent
          textBg="bg-gray-900"
          textColor="text-white"
          icon={<BsFillTrashFill />}
          onClick={edit}
        />
      </td>
    </tr>
  );
};

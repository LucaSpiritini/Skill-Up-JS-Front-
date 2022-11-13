import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useBalanceQuery } from "../store/userApiSlice";

export const Stadistics = ({ income, outcome }) => {
  console.log(income);
  return (
    <PieChart
      data={[
        { title: "Incomes", value: income, color: "#56E39F" },
        { title: "Outcomes", value: outcome, color: "#FE5F55" },
      ]}
      totalValue={income + outcome}
      label={({ dataEntry }) =>
        `${dataEntry.title}: ${Math.round(dataEntry.percentage)}  %`
      }
      labelPosition={60}
      labelStyle={() => ({
        fontSize: "5px",
      })}
    />
  );
};

const SingleBalance = ({ currency, balance, income, outcome }) => {
  if (!income || !outcome) return <p>There is no balance in {currency}</p>;
  let content = (
    <>
      <h3 className="text-2xl text-center">
        {currency.charAt(0).toUpperCase() + currency.slice(1)}
      </h3>
      <div className="flex">
        <div className="flex-1">
          <div className="flex flex-col items-center justify-center space-y-3 h-full ">
            <p>Balance: ${balance}</p>
            <p>Income: ${income > 0 ? income : 0}</p>
            <p>Outcome: ${outcome > 0 ? outcome : 0}</p>
          </div>
        </div>
        <div className="m-12">
          <Stadistics income={income} outcome={outcome} />
        </div>
      </div>
    </>
  );
  return balance > 0 && content;
};

export const BalanceScreen = () => {
  const { data, isLoading, isError, isSuccess, error } = useBalanceQuery();

  let content;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    console.log(data.body);
    const { incomePesos, outcomePesos } = data.body;
  }
  return (
    <div className="flex flex-col mx-auto bg-white w-[95%] md:w-[80%] rounded-lg">
      <div className="m-5 md:m-12">
        <h2 className="text-2xl">Current Balance</h2>
        {isSuccess &&
          data?.body?.map((balance) => (
            <SingleBalance
              key={balance.currency}
              currency={balance.currency}
              balance={balance.balance}
              income={balance.income}
              outcome={balance.outcome}
            />
          ))}
      </div>
    </div>
  );
};

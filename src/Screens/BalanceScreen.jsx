import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useBalanceQuery } from "../store/userApiSlice";

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
    const { income, outcome } = data.body;

    content = (
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
  }
  return (
    <div className="flex flex-col mx-auto bg-white w-[95%] md:w-[80%] rounded-lg">
      <div className="m-5 md:m-12">
        <h2 className="text-2xl">Current Balance</h2>
        <div className="flex">
          <div className="flex-1">
            <div className="flex flex-col items-center justify-center space-y-3 h-full ">
              <p>Balance: ${data.body.balance}</p>
              <p>Income: ${data.body.income}</p>
              <p>Outcome: ${data.body.outcome}</p>
            </div>
          </div>
          <div className="m-12">{content}</div>
        </div>
      </div>
    </div>
  );
};

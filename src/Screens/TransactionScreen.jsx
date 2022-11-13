import React from "react";
import { useState } from "react";
import { Table } from "../Components/Table";
import { useGetTransactionsQuery } from "../store/transactionApiSlice";
import { SingleRow } from "../Components/Table/SingleRow";
import { Paginate } from "../Components/Paginate";
import { useRef } from "react";

import Loading from "../Components/Loading/Loading";

export const TransactionScreen = () => {
  const filterRef = useRef("");
  const [page, setPage] = useState(0);
  const [currency, setCurrency] = useState("pesos");
  const [description, setDescription] = useState("");

  const { data, isLoading, isError, error, isSuccess } =
    useGetTransactionsQuery(
      { page, description, currency },
      { refetchOnMountOrArgChange: true }
    );

  const setDesc = (e) => {
    e.preventDefault();
    setDescription(filterRef.current.value);
    setPage(0);
  };
  let content;
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    console.log(error);
    //TODO Alert Popup
  }
  if (isSuccess) {
    console.log(data.body);
    content = data?.body.rows.map((transaction) => (
      <SingleRow transaction={transaction} key={transaction.id} />
    ));
  }

  return (
    <div className="flex flex-col mx-auto bg-white w-[95%] md:w-[80%] rounded-lg">
      <div className="m-5 md:m-12">
        <h2 className="text-2xl font-bold mb-6">Transactions</h2>

        <form onSubmit={setDesc} className="flex mt-2">
          <input
            type="text"
            placeholder="Please enter a description to search"
            ref={filterRef}
            className="bg-[#F0F0F0] w-full rounded-lg p-2 outline-none"
          />
          <button className="bg-gray-900 text-white py-2 rounded-r-xl px-4 flex-1">
            Search
          </button>
        </form>
        <div className="flex items-center justify-end">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            value={currency}
            className="py-3 outline-none"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="pesos">Pesos</option>
            <option value="dolares">Dolares</option>
            <option value="euros">Euros</option>
          </select>
        </div>

        <Table>{content}</Table>
        <div className="flex justify-end">
          {isSuccess && (
            <Paginate totalPages={data?.body.totalPages} changePage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

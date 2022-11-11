import React from "react";
import { useState } from "react";
import { Table } from "../Components/Table";
import { useGetTransactionsQuery } from "../store/transactionApiSlice";
import { SingleRow } from "../Components/Table/SingleRow";
import { Paginate } from "../Components/Paginate";
import { useRef } from "react";

export const TransactionScreen = () => {
  const filterRef = useRef("");
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");

  const { data, isLoading, isError, error, isSuccess } =
    useGetTransactionsQuery({ page, description });

  const setDesc = (e) => {
    e.preventDefault();
    setDescription(filterRef.current.value);
    setPage(0);
  };
  let content;
  if (isLoading) {
    return <p>Loading</p>; // TODO change to Loader Spinner
  }
  if (isError) {
    // console.log(error);
    //TODO Alert Popup
  }
  if (isSuccess) {
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
          <button className="bg-black text-white rounded-r-xl py-2 px-4">
            Search
          </button>
        </form>

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

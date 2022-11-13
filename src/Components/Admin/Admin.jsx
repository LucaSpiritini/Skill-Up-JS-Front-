import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllTransactionQuery } from "../../store/transactionApiSlice";
import { useGetAllUserQuery } from "../../store/userApiSlice";
import { Paginate } from "../Paginate";
import { Table } from "../Table";
import { selectUser } from "../../store/authSlice";
import { SingleRow } from "../Table/SingleRow";
import { useNavigate } from "react-router-dom";
function Admin() {
  const navigate = useNavigate();
  const [pageTrans, setPageTrans] = useState(0);
  const [pageUser, setPageUser] = useState(0);
  const { data, isLoading, isError, error, isSuccess } =
    useGetAllTransactionQuery(
      { pageTrans },
      { refetchOnMountOrArgChange: true }
    );

  const { data: users, isSuccess: Success } = useGetAllUserQuery(
    { pageUser },
    { refetchOnMountOrArgChange: true }
  );
  let trans;
  if (isSuccess) {
    trans = data?.body.rows.map((transaction) => (
      <SingleRow transaction={transaction} key={transaction.id} />
    ));
  }

  console.log(users?.body.rows);

  return (
    <div>
      <h1 className="text-center text-5xl mt-5">Dashboard Admin</h1>
      <section className="max-w-[50%] border-2">
        <Table>{trans}</Table>
        <div className="flex justify-end">
          {isSuccess && (
            <Paginate
              totalPages={data?.body.totalPages}
              changePage={setPageTrans}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Admin;

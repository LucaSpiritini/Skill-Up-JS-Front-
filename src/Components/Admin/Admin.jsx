import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllTransactionQuery } from "../../store/transactionApiSlice";
import { AiOutlineEdit } from "react-icons/ai";
import ButtonComponent from "../ButtonComponent";
import { useGetAllUserQuery,useDeleteUserMutation } from "../../store/userApiSlice";
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
  const [deleteUser] = useDeleteUserMutation({ refetchOnMountOrArgChange: true })
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
  const edit = (id) => {
    navigate(`/admin/userEdit${id}`)
  };
  const deleteUs = async (id) => {
    deleteUser({id})
    window.location.reload()
  }  

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-5xl mt-5">Dashboard Admin</h1>
      <div className="flex flex-col gap-5 sm:flex-row">
        <section className="w-full border-2 rounded-md shadow-md">
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
        <section className="w-full border-2 flex flex-col rounded-md shadow-md">
          <div className="mx-auto rounded-lg p-1 md:p-2">
            <table className="table-layout border-separate w-full">
              <thead className="text-center">
                <tr>
                  <th>Delete</th>
                  <th>Avatar</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Id</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {Success &&
                  users?.body.rows.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-300 ">
                      <td className="text-center"><button onClick={()=>deleteUs(e.id)}>X</button></td>
                      <td><img src={e.avatar} alt={e.firstName} className='w-10 rounded-full' /></td>
                      <td className="text-center">{e.firstName}</td>
                      <td className="text-center">{e.lastName}</td>
                      <td className="text-center">{e.email}</td>
                      <td className="text-center">{e.id}</td>
                      <td>
                        <ButtonComponent  
                          icon={<AiOutlineEdit />}
                          textBg="bg-gray-900"
                          textColor="text-white"
                          onClick={()=>edit(e.id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-end">
            {isSuccess && (
              <Paginate
                totalPages={users?.body.totalPages}
                changePage={setPageUser}
              />
            )}
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;

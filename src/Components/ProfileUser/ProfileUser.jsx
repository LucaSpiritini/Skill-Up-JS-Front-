import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/authSlice";
import { useUserDeleteMutation } from "../../store/userApiSlice";
import alert from "../Alert/Alert";

export default function ProfileUser() {
  const [userDelete] = useUserDeleteMutation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  function edit() {
    navigate("/edituser");
  }
  function navigateto() {
    userDelete(user.id);
    navigate("/login");
  }
  function deleteUser(e) {
    e.preventDefault();
    alert(
      "Delete Account",
      "Safe to delete, this action is irreversible",
      "question",
      "User Deleted",
      navigateto
    );
  }
  return (
    <div>
      <div className=" md:w-1/2 lg:w-1/3  rounded-lg p-0 mx-auto ">
        <div className="p-5">
          <h2 className="text-center text-xl md:text-4xl">Profile User</h2>
        </div>
        <div className="flex justify-between shadow-2xl  border-b rounded-md w-full py-5 px-3 text-black leading-tight ">
          <section className="flex flex-col my-2 mx-2 font-semibold">
            <span>Firstname: {user.firstName}</span>
            <br />
            <span>Lastname: {user.lastName}</span>
            <br />
            <span>Email: {user.email}</span>
            <br />
            <button
              className="h-6 px-4  rounded-md bg-rose-900 text-white mx-0 font-normal"
              onClick={(e) => deleteUser(e)}
            >
              DELETE ACCOUNT
            </button>
          </section>
          <button
            onClick={edit}
            className="h-6 px-4  rounded-md bg-black text-white  font-semibold"
          >
            Edit
          </button>
        </div>
      </div>
      {/* <div className="fixed top-0 left-auto w-full h-auto ">
        <UserEdit action={"edit"} />
      </div> */}
    </div>
  );
}

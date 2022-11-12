import React from "react";
import user from "./user";

export default function ProfileUser() {
  return (
    <div className="flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-2 rounded-lg p-0 mx-auto border-2mb-8">
      <div className="p-5">
        <h2 className="text-center text-xl md:text-4xl">Profile User</h2>
      </div>
      <div className="shadow appearance-none border-b rounded-md w-full py-5 px-3 text-black leading-tight ">
        <span>Firstname: {user.firstName}</span>
        <br />
        <span>Lastname: {user.lastName}</span>
        <br />
        <span>Email: {user.email}</span>
        <br />
        <button className="border">DELETE ACCOUNT </button>
      </div>
    </div>
  );
}

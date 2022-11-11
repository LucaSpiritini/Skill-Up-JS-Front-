import React from "react";
import user from "./user";

export default function ProfileUser() {
  return (
    <div>
      <span>firstname: {user.firstName}</span>
      <br />
      <span>lastname: {user.lastName}</span>
      <br />
      <span>Email: {user.email}</span>
      <br />
      <span>DELETE ACCOUNT </span>
    </div>
  );
}

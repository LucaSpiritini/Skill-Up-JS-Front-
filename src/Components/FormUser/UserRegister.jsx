import React from "react";
import { useRegisterMutation } from "../../store/authApiSlice";
import FormikContainer from "./FormikContainer";

function UserRegister() {
  return (
    <div>
      <FormikContainer action="register" />
    </div>
  );
}

export default UserRegister;

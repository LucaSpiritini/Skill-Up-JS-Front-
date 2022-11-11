import React from "react";
import { useRegisterMutation } from "../../store/authApiSlice";
import FormikContainer from "./FormikContainer";

function UserRegister() {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  // console.log(isError);
  return (
    <div>
      <FormikContainer action={"register"} />
    </div>
  );
}

export default UserRegister;

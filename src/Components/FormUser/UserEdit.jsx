import React from "react";
import { useUserEditMutation } from "../../store/userApiSlice";
import FormikContainer from "./FormikContainer";

function UserEdit() {
  const [userEdit, { isLoading, isSuccess, isError, error }] =
    useUserEditMutation();
  return (
    <div>
      <FormikContainer action={"edit"} id="" />
    </div>
  );
}

export default UserEdit;

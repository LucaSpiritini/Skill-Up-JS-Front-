import React from "react";
import { useUserEditMutation } from "../../store/userApiSlice";
import FormikContainer from "./FormikContainer";

function UserEdit() {
  return (
    <div>
      <FormikContainer action="edit" />
    </div>
  );
}

export default UserEdit;

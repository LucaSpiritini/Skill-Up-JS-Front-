import React from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../store/authApiSlice";
import FormikContainer from "./FormikContainer";

function UserRegister() {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-5xl my-12">Alkemy Bank</h1>
      <FormikContainer action={"register"} />
      <div>
        <p className="text-center mt-2">
          Already Have an acount?
          <Link className="ml-2 underline" to={"/login"}>
            Please login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;

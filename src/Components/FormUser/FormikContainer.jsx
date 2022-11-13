import * as Yup from "yup";
import React, { useEffect } from "react";
import FormikControl from "../Form/FormikControl";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useUserEditMutation,
  useUserRegisterMutation,
} from "../../store/userApiSlice";
import { selectUser, setCredentials } from "../../store/authSlice";
import alert from "../Alert/Alert";

export default function FormikContainer({ action }) {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRegister, { isError: isErrorRegister, error: errorRegister }] =
    useUserRegisterMutation();
  const [userEdit, { isSuccess, isError: isErrorEdit, error: errorEdit }] =
    useUserEditMutation();

  const initialValues = {
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    email: user ? user.email : "",
    password: "",
    avatar: user ? user.avatar : "",
  };

  if (
    (isErrorRegister && errorRegister.originalStatus === 404) ||
    (isErrorEdit && errorEdit.status === 404)
  ) {
    alert("Error", "Error email already exist", "error");
  }

  if (!isErrorEdit && isSuccess) {
    console.log(isSuccess);
    alert("success", "Modified data", "success");
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required(" Required"),
    lastName: Yup.string().required(" Required"),
    email: Yup.string().email().required(" Required"),
    password: action === "register" && Yup.string().required(" Required"),
  });

  const onSubmit = async (values) => {
    try {
      let data;

      if (action === "edit") {
        data = await userEdit({ id: user.id, values }).unwrap();
      } else {
        data = await userRegister(values).unwrap();
      }
      const { token } = data.body;
      dispatch(setCredentials({ token }));
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  function goBack() {
    if (action === "edit") return navigate("/profile");
    if (action === "register") return navigate("/");
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e) => onSubmit(e)}
    >
      {(formik) => (
        <Form className="flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-2 rounded-lg p-0 mx-auto border-2mb-8">
          <div className="p-5">
            <h2 className="text-center text-xl md:text-4xl">
              {user?.firstName ? "Edit User" : "Register"}
            </h2>
          </div>
          <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <FormikControl
              className="border rounded-lg p-1 outline-none w-full"
              control="input"
              type="text"
              label="First Name "
              name="firstName"
            />
          </div>

          <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <FormikControl
              className="border rounded-lg p-1 outline-none w-full"
              control="input"
              type="text"
              label="Last Name "
              name="lastName"
            />
          </div>
          <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <FormikControl
              className="border rounded-lg p-1 outline-none w-full"
              control="input"
              type="email"
              label="Email "
              name="email"
              placeholder="wallet@wallet.com"
            />
          </div>
          <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <FormikControl
              className="border rounded-lg p-1 outline-none w-full"
              control="input"
              type="password"
              label="Password "
              name="password"
            />
          </div>
          <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <FormikControl
              className="border rounded-lg p-1 outline-none w-full "
              control="input"
              type="url"
              label="Avatar "
              name="avatar"
              placeholder="Url Image Profile"
            />
          </div>
          <button
            type="submit"
            disabled={!formik.isValid}
            className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
          >
            Submit
          </button>
          {action === "register" && (
            <button
              type="reset"
              className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
            >
              Reset
            </button>
          )}
          <button
            className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
            onClick={goBack}
          >
            Back
          </button>
        </Form>
      )}
    </Formik>
  );
}

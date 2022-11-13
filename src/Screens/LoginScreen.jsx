import * as Yup from "yup";
import React from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

import FormikControl from "../Components/Form/FormikControl";
import { useLoginMutation } from "../store/authApiSlice";
import alert from "../Components/Alert/Alert";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const initialValues = {
    email: "",
    password: "",
  };
  console.log(error?.originalStatus);
  if (isError && error.originalStatus === 404) {
    alert("Error", "Password not match!", "error");
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required(" Required"),
    password: Yup.string().required(" Required"),
  });

  const onSubmit = async (values) => {
    try {
      const data = await login(values).unwrap();

      const { token } = data.body;
      dispatch(setCredentials({ token }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1 className="text-center text-2xl md:text-5xl my-12">Alkemy Bank</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(e) => onSubmit(e)}
      >
        {(formik) => (
          <Form className="flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-2 rounded-lg p-0 mx-auto border-2mb-8">
            <div className="p-5">
              <h2 className="text-center text-xl md:text-4xl">Login</h2>
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

            <button
              type="submit"
              className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
            >
              Login
            </button>
            <button
              type="reset"
              className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
            >
              Reset
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <p className="text-center mt-2">
          Doesn't have an account?
          <Link className="ml-2 underline" to={"/register"}>
            Please register
          </Link>
        </p>
      </div>
    </>
  );
};

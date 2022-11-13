import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery, useUserEditMutation } from "../../store/userApiSlice";
import alert from "../Alert/Alert";
import * as Yup from "yup";
import FormikControl from "../Form/FormikControl";
import { Formik, Form } from "formik";
function AdminUserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserQuery({ id }, { refetchOnMountOrArgChange: true });
  const [
    userEdit,
    { isSuccess: SuccessEdit, isError: isErrorEdit, error: errorEdit },
  ] = useUserEditMutation();

  const initialValues = {
    firstName: user ? user.body.firstName : "",
    lastName: user ? user.body.lastName : "",
    email: user ? user.body.email : "",
  };

  if (isErrorEdit) {
    if (errorEdit.status === 404) {
      alert("Error", errorEdit.data.error, "error");
    } else {
      console.log("error", errorEdit.status);
      alert("Error", "Erssror", "error");
    }
  }
  function goBack() {
    navigate("/admin");
  }
  const onSubmit = async (values) => {
    console.log(values);
    // try {
    //     await userEdit({ id: user.body.id, values }).unwrap();
    //     navigate('/admin')
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <>
      {isSuccess && (
        <Formik initialValues={initialValues} onSubmit={(e) => onSubmit(e)}>
          <Form className="flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-2 rounded-lg p-0 mx-auto border-2mb-8">
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
            <button
              type="submit"
              className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
            >
              Submit
            </button>
            <button
              type="button"
              className="h-10 px-6 font-semibold rounded-full bg-gray-400 text-gray-700"
              onClick={goBack}
            >
              Back
            </button>
          </Form>
        </Formik>
      )}
    </>
  );
}

export default AdminUserEdit;

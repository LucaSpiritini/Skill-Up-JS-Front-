import React from "react";
// firstName, lastName, email, avatar, password;
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Form/FormikControl";
import { useCreateTransactionMutation } from "../../store/transactionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import { setCredentials } from "../../store/authSlice";

export default function TransactionForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createTransaction, { isLoading, isSuccess, isError, error }] =
    useCreateTransactionMutation();
  const user = useSelector((state) => state.auth);
  const pathName = useLocation().pathname;

  const initialValues = {
    description: "",
    amount: "",
    // currency: "",
    // date: "",
    userId: user.user.id,
    categoryId: pathName === "/deposit" ? 1 : 2,

    //toUserId: "",

  };
  const validationSchema = Yup.object({
    description: Yup.string().required(" Required"),
    amount: Yup.number().required(" Required"),
  });
  const onSubmit = async () => {
    try {
      console.log(user.user.id);
      const data = await createTransaction({
        description: description.value,
        amount: amount.value,
        currency: amount.value,
        // date: date.value,
        userId: user.user.id,
        categoryId: pathName === "/deposit" ? 1 : 2,

        // toUserId: toUserId.value,

      }).unwrap();
      console.log(data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(categoryId)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-3">
            <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <FormikControl
                control="input"
                type="text"
                placeholder="Description "
                name="description"
              />
            </div>
            <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <FormikControl
                control="input"
                type="number"
                placeholder="Amount"
                name="amount"
              />
            </div>
            <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {/* <FormikControl
                control="input"
                type="select"
                placeholder="Currency "
                name="currency"
              /> */}
            </div>
            <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {/* <FormikControl
                control="input"
                type="date"
                placeholder="Date "
                name="date"
              /> */}
            </div>
            {pathName === "/send" ? (
              <div className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <FormikControl
                  control="input"
                  type="number"
                  placeholder="To user "
                  name="toUserId"
                />
              </div>
            ) : null}

            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
            <br />
            <button type="reset">Reset</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

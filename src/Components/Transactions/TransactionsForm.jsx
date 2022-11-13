import React from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikControl from "../Form/FormikControl";
import {
  transactionApiSlice,
  useCreateTransactionMutation,
  useEditTransactionMutation,
} from "../../store/transactionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TransactionForm(props) {
  const navigate = useNavigate();
  const [createTransaction, { isLoading, isSuccess, isError, error }] =
    useCreateTransactionMutation();
  const [editTransaction, { isLoading: isLoadingEdit }] =
    useEditTransactionMutation();
  const user = useSelector((state) => state.auth);
  const { pathname, state } = useLocation();

  console.log(props);
  const initialValues = {
    description: pathname.split("-")[0] === "/edit" ? state.description : "",
    amount: "",
    currency: "",
    date: "",
    userId: user.user.id,
    categoryId: pathname === "/deposit" ? 1 : 2,
    toUserId: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string().required(" Required"),
    amount: Yup.number().required(" Required").min(0),
  });

  const editValidationSchema = Yup.object({
    description: Yup.string().required(" Required"),
  });

  const onSubmit = async () => {
    try {
      if (pathname.split("-")[0] === "/edit") {
        await editTransaction({
          id: state.id,
          description: description.value,
        }).unwrap();
      } else {
        await createTransaction({
          description: description.value,
          amount: amount.value,
          currency: currency.value,

          userId: user.user.id,
          categoryId: pathname === "/deposit" ? 1 : 2,
          toUserId:
            pathname === "/send" ? toUserId.vale : initialValues.toUserId.value,
        }).unwrap();
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {pathname === "/pay" ||
      pathname === "/send" ||
      pathname === "/deposit" ? (
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
              <Field
                name="currency"
                id="currency"
                as="select"
                type="select"
                control="select"
                className="shadow appearance-none border-b rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="pesos">Pesos</option>
                <option value="dolares">Dolares</option>
                <option value="euros">Euros</option>
              </Field>
              {pathname === "/send" ? (
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
                Create
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={editValidationSchema}
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

                <button type="submit" disabled={!formik.isValid}>
                  Edit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

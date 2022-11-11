import React from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikControl from "../Form/FormikControl";
import {
  transactionApiSlice,
  useCreateTransactionMutation,
} from "../../store/transactionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TransactionForm() {
  const navigate = useNavigate();
  const [createTransaction, { isLoading, isSuccess, isError, error }] =
    useCreateTransactionMutation();
  const user = useSelector((state) => state.auth);
  const pathName = useLocation().pathname;

  const initialValues = {
    description: "",
    amount: "",
    currency: "",
    date: "",
    userId: user.user.id,
    categoryId: pathName === "/deposit" ? 1 : 2,
    toUserId: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string().required(" Required"),
    amount: Yup.number().required(" Required").min(0),
  });

  const onSubmit = async () => {
    console.log("currency", currency.value);
    try {
      const data = await createTransaction({
        description: description.value,
        amount: amount.value,
        currency: currency.value,
        date: date.value,
        userId: user.user.id,
        categoryId: pathName === "/deposit" ? 1 : 2,
        toUserId:
          pathName === "/send" ? toUserId.vale : initialValues.toUserId.value,
      }).unwrap();
      console.log("currency en data", data.body.currency);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {pathName === "/pay" ||
      pathName === "/send" ||
      pathName === "/deposit" ? (
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
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <h1>editar transaccion</h1>
        </div>
      )}
    </div>
  );
}

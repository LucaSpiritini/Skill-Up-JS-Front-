import * as Yup from "yup";
import React from "react";
import FormikControl from "../Form/FormikControl";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useUserEditMutation,
  useUserRegisterMutation,
} from "../../store/userApiSlice";
import { setCredentials } from "../../store/authSlice";

export default function FormikContainer(action) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRegister] = useUserRegisterMutation();
  const [userEdit] = useUserEditMutation();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // avatar: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required(" Required"),
    lastName: Yup.string().required(" Required"),
    email: Yup.string().email().required(" Required"),
    password: Yup.string().required(" Required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      let data;
      if (action === "edit") {
        data = await userEdit(values).unwrap();
      } else {
        data = await userRegister(values).unwrap();
      }
      const { token } = data.body;
      dispatch(setCredentials({ token }));
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e) => onSubmit(e)}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="text"
            label="First Name "
            name="firstName"
          />
          <FormikControl
            control="input"
            type="text"
            label="Last Name "
            name="lastName"
          />
          <FormikControl
            control="input"
            type="email"
            label="Email "
            name="email"
          />
          <FormikControl
            control="input"
            type="password"
            label="Password "
            name="password"
          />
          {/* <FormikControl
            control="input"
            type="url"
            label="Avatar "
            name="avatar"
          /> */}

          <button type="submit" disabled={!formik.isValid}>
            Submit
          </button>
          <button type="reset">Reset</button>
        </Form>
      )}
    </Formik>
  );
}

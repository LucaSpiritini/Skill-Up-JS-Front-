import React from "react";
import { Formik } from "formik";
import Boton from "../Boton";
import axios from "axios";

const CategoryForm = () => {
  return (
    <div>
      <h1>New category</h1>

      <Formik
        initialValues={{
          description: "",
          name: "",    
        }}
        validate={(values) => {
          let errores = {};
          !values.description
            ? (errores.description = "Description must be completed")
            : null;
            !values.name
            ? (errores.name = "Name must be completed")
            : null;
          return errores;
        }}
        onSubmit={(formValues) => {
          axios.post("http://localhost:3000/categories", formValues);
          console.log(formValues);
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
                <div className="error">{errors.name}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Description"
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>

            <Boton text="acept" />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryForm;

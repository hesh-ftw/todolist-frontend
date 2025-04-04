import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, colors } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../States/Authentication/Action";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER"
  };
  const navigate= useNavigate();
 const dispatch= useDispatch()

  const handleSubmit = (values) => {
    const userData = {
      ...values,
      role: values.role || "ROLE_USER",  // Set default role if empty
    };
    console.log("Form signup values:", values);

    // navigate to RegisterUser function in authentication/Action.js to send api req.
    dispatch(registerUser({userData, navigate}))
  };


  return (
    <div>
      <Typography variant="h6" className="text-center text-gray-200">
        Welcome!<br />
        Create Your New Account
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({handleSubmit }) => (
         <Form onSubmit={handleSubmit} className="p-5">
            <Field
              as={TextField}
              name="fullName"
              label="full name"
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{
                style: { color: "white", background: "#333" },
              }}
            />

            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{
                style: { color: "white", background: "#333" },
              }}
            />

            <Field
              as={TextField}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{
                style: { color: "white", background: "#333" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: "10px", backgroundColor: "gray" }}
            >
              Submit
            </Button>
          </Form>
      )} 
      </Formik>

      <div className="text-gray-400 ml-5">
        Already have an account?
        <Link to={"/account/login"} className="ml-2 text-gray-200">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

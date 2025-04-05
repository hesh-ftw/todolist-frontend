import { TextField, Typography, Button } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../States/Authentication/Action";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate=useNavigate()
  const dispatch= useDispatch()

  const handleSubmit = (values) => {


    if(!values.email || !values.password){
      alert('Please fill all fields')
      return;
    }


    const userData = {
      ...values,
      role: values.role || "ROLE_USER",  // Set default role if empty
    };    dispatch(loginUser({userData,navigate})) // navigate to loginUser function in auth action to send api req.
  };


  return (
    <div>
      <Typography variant="h6" className="text-center text-gray-200">
      Welcome!<br/>
      Sign in to continue.
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>

         {({handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="p-5">
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
              color="primary"
              fullWidth
              style={{ marginTop: "10px", backgroundColor: "gray" }}
            >
              Submit
            </Button>

            <div className="text-gray-400 pt-5">
                Forgot Your Password ? 
            <Link to={"/forgot-password"} className="ml-2 text-gray-200">
                  Reset 
            </Link>
            </div>
            <div className="text-gray-400 ">
                    Still don't have an account?
                    <Link to={"/account/register"} className="ml-2 text-gray-200">
                      Sign Up
                    </Link>
                  </div>
         
          </Form>
         )}
      </Formik>
    </div>
  );
};

export default LoginForm;

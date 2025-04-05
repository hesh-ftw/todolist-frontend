import { TextField, Typography, Button } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword, loginUser, resetPassword } from "../../States/Authentication/Action";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (value) => {

    if(!value.email){
        alert("Please enter your email")
        return;
      }
    dispatch(forgotPassword({email: value.email}));
    console.log('reset email--', value.email);

  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#808080", 
      }}
    >
      <div
        style={{
          width: 400,
          backgroundColor: "#111",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          To Update Your Password!
        </Typography>
        <Typography variant="body2" className="mb-4">
          Enter your Account Email
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
               <Field
                  as={TextField}
                  name="email"
                  label="Enter Your Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="email"
                  InputLabelProps={{ style: { color: "gray" } }}
                  InputProps={{
                    style: { color: "white", background: "#333" },
                  }}
                 />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{
                  marginTop: "10px",
                  backgroundColor: "#666",
                  color: "white",
                }}
              >
                SUBMIT
              </Button>

              <div className="text-gray-400 p-2">
                Back to Sign In?
                <Link to="/account/login" className="ml-2 text-blue-400">
                  Sign In
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;

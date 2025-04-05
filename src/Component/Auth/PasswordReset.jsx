import { TextField, Typography, Button } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, resetPassword } from "../../States/Authentication/Action";

const PasswordReset = () => {
  const initialValues = {
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

   // Get the token from the URL query string
   const { search } = useLocation();
   const token = new URLSearchParams(search).get("token");

   const handleSubmit = (values) => {

    if(!values.password){
      alert("Please enter your password")
      return;
    }
       // Pass token and new password to the action
       dispatch(resetPassword(token, values.password));
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
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update Your Password!
        </Typography>
        <Typography variant="body2" className="mb-4">
          Enter your new password
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                name="password"
                label="New Password"
                fullWidth
                variant="outlined"
                margin="normal"
                type="password"
                InputLabelProps={{ style: { color: "white" } }}
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

export default PasswordReset;

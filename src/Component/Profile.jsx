import React, { useEffect } from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../States/Authentication/Action';


function Profile() {

    const {auth} = useSelector(store=> store);
    const navigate= useNavigate();
    const dispatch= useDispatch();


    const handleLogout=()=>{
        console.log("user logged out!");
        dispatch(logout());
        navigate("/");
    }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center mt-10"
    style={{ position: "relative", zIndex: 1 }}>
  <div className="flex flex-col items-center justify-center">
    <AccountCircleIcon sx={{ fontSize: "7rem", background:'white'}} />
    <h1 className="pt-2 pb-2 text-2xl font-semibold">Your Profile </h1>
    
    <div className="mt-6 space-y-2 text-gray-800 text-left">
          <p><span className="font-semibold">Id:</span> {auth.user?.id}</p>
          <p><span className="font-semibold">User Name:</span> {auth.user?.fullName}</p>
          <p><span className="font-semibold">Email:</span> {auth.user?.email}</p>
    </div>
    
    <Button
    variant="contained"
     onClick={handleLogout}
      sx={{ margin: "2rem 0rem", background:'black'}}
    >
      Logout
    </Button>
  </div>
</div>
  )
}

export default Profile

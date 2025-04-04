import { IconButton } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useDispatch } from "react-redux";
import { getUser } from "../States/Authentication/Action";

function NavBar() {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const jwt= localStorage.getItem("jwt");
 
  
  const handleOnClick = () => {
      dispatch(getUser(jwt)); // Fetch user data before navigating
      navigate("/profile");
  };

  return (
    <nav className="bg-black text-white p-5 flex justify-between items-center py-2">

      {!jwt &&( 
      <Link to="/" className="text-xl font-bold p-2">
          TODO APP
      </Link>
    )}
      {jwt &&(<Link to="/dashboard" className="text-xl font-bold p-2">
          DashBoard
      </Link>)}

      {jwt && (
        <IconButton className="ml-auto text-2xl" onClick={handleOnClick}>
          <PersonOutlineIcon className="text-white" style={{ fontSize: "30px" }} />
        </IconButton>
      )}
    </nav>
  );
}

export default NavBar;

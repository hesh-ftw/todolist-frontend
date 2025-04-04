import { Box, Modal } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#111',
        boxShadow: 'none', 
        border: 'none',
        outline: 'none',
        p: 4
        
      };

    const navigate= useNavigate();
    const location= useLocation();

    const handleOnClose= ()=>{
        navigate('/')
    }



  return (
    <div>
      
      {/* login, register model */}
      
      <Modal 
        onClose={handleOnClose}
        open={ 
            location.pathname==="/account/register" ||
            location.pathname==="/account/login"     
        }>

        <Box sx={style}>   
            {location.pathname==="/account/register"? <RegisterForm/> : <LoginForm/> }
        </Box>    
        
      </Modal>

    </div>
  )
}

export default Auth

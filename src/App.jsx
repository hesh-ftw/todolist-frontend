import './App.css'
import HomePage from './Component/HomePage';
import NavBar from './Component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Profile from './Component/Profile';
import Auth from './Component/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './States/Authentication/Action';
import DashBoard from './Component/DashBoard';
import PasswordReset from './Component/Auth/PasswordReset';
import ForgotPassword from './Component/Auth/ForgotPassword';
import AddTaskModal from './Component/AddTaskModal';
import TodaysTasks from './Component/TodaysTasks';
import { Toaster } from 'react-hot-toast';


function App() {

  const dispatch= useDispatch();
  const jwt = localStorage.getItem("jwt");

  const {auth}= useSelector(store=>store);

  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt));
   
  }, [auth.jwt]);


  return (
    <div>
      <NavBar />
      <Routes>
        <Route  path='/' element={<HomePage/>}/>
        <Route  path='/profile' element={<Profile/>}/>
        <Route  path='/dashboard' element={<DashBoard/>}/>
        <Route  path='/reset-password' element={<PasswordReset/>}/>
        <Route  path='/forgot-password' element={<ForgotPassword/>}/>
        <Route  path='/dashboard-addtask' element={<AddTaskModal/>}/>
        <Route  path='/highlights' element={<TodaysTasks/>}/>

      </Routes>

      <Toaster position='bottom-center'/>   

      
      <Auth/>
    </div>
     
  );
}

export default App

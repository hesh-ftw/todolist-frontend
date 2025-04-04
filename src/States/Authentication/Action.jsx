import axios from "axios"
import { 
     GET_USER_FALIURE, 
     GET_USER_REQUEST, 
     GET_USER_SUCCESS, 
     LOGIN_FALIURE, 
     LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FALIURE, REGISTER_REQUEST, REGISTER_SUCCESS,
     RESET_PASSWORD_FAILURE,
     RESET_PASSWORD_REQUEST,
     RESET_PASSWORD_SUCCESS,
     SET_NEW_PASSWORD_FAILURE,
     SET_NEW_PASSWORD_REQUEST,
     SET_NEW_PASSWORD_SUCCESS, 
     } from "./ActionType"
import { api, API_URL } from "../../Config/api"

//register a new user
export const registerUser=(reqData)=> async(dispatch)=>{
    dispatch({type: REGISTER_REQUEST}) // tell redux that registration request has started

    try{
        //make api req
        const response= await axios.post(`${API_URL}/api/public/signup`,reqData.userData)
        const data= response.data; //extract response data property 

        
        //save jwt in local storage
        //if(data.jwt)localStorage.setItem("jwt", data.jwt); 
        
        
        if(data.role == "ROLE_USER"){
            reqData.navigate("/account/login")
        }
       

        dispatch({type:REGISTER_SUCCESS,payload:data.jwt}) // if register success redux store the jwt 
        console.log("register success", data)


    } catch(error){
        dispatch({type:REGISTER_FALIURE, payload:error})
        console.log("error", error)
    }
    
}

//login a new user
export const loginUser=(reqData)=> async(dispatch)=>{
    dispatch({type: LOGIN_REQUEST}) // tell redux that login request has started

    try{
        //make api req
        const response= await axios.post(`${API_URL}/api/public/signin`,reqData.userData)
        const data= response.data; //extract response data property 

        
        //save jwt in local storage
        if(data.jwt)localStorage.setItem("jwt", data.jwt); 
        
        //save user in local storage
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        if(reqData){
            reqData.navigate("/dashboard")
        }
        
        
        dispatch({type:LOGIN_SUCCESS,payload:data}) 
        console.log("login success", data)

    } catch(error){
        dispatch({type:LOGIN_FALIURE, payload:error})

        console.log("error", error)
    }
    
}


//authorize exisitng user on login page and get user details using jwt
export const getUser=(jwt)=> async(dispatch)=>{
    dispatch({type: GET_USER_REQUEST}) 
    try{
        //make api req
        const response= await axios.get(`${API_URL}/api/users/profile`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        })
        const data= response.data; 
       

        dispatch({type:GET_USER_SUCCESS,payload:data}) 
        console.log("user profile", data)

    } catch(error){
        dispatch({type:GET_USER_FALIURE, payload:error})
        console.log("error", error)
    }
    
}


//logout method
export const logout =()=> async(dispatch)=>{
    dispatch({type: LOGOUT}) 
    try{

        localStorage.clear(); //remove jwt when logout
        dispatch({type:LOGOUT}) 
        console.log(" logout success ")

    } catch(error){
        
        console.log("error", error)
    }
    
}

//forgot password 
export const forgotPassword=(email)=> async(dispatch)=>{
    dispatch({type: RESET_PASSWORD_REQUEST}) 
    try{
        //make api req
        const response= await api.post(`/api/public/forgot-password`,email)
        const data= response.data; 
       

        dispatch({type:RESET_PASSWORD_SUCCESS, payload:data}) 
        console.log("password reset email sent!", data)

    } catch(error){
        dispatch({type:RESET_PASSWORD_FAILURE, payload:error})
        console.log("error sending reset email", error)
    }
}


//set new password
export const resetPassword=(token, newPassword)=> async(dispatch)=>{
    dispatch({type: SET_NEW_PASSWORD_REQUEST}) 
    try{
        // Send password reset token and new password as URL parameters
        const response = await api.post(`/api/public/reset-password?token=${token}&newPassword=${newPassword}`);
        const data = response.data;

       

        dispatch({type:SET_NEW_PASSWORD_SUCCESS, payload:data}) 
        console.log("new password set successfully! ", data)

    } catch(error){
        dispatch({type:SET_NEW_PASSWORD_FAILURE, payload:error})
        console.log("error setting new password", error)
    }
    
}
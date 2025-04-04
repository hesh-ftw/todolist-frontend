import {
    GET_USER_FALIURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FALIURE, LOGIN_REQUEST,
     LOGIN_SUCCESS, LOGOUT, REGISTER_FALIURE, REGISTER_REQUEST, REGISTER_SUCCESS,
     RESET_PASSWORD_REQUEST,
     RESET_PASSWORD_SUCCESS,
     SET_NEW_PASSWORD_REQUEST,
     SET_NEW_PASSWORD_SUCCESS, 
     } from "./ActionType";

const initialState={
    user: null,
    jwt: null,
    isLoading: null,
    error:null,
    success:null
}

 export const authReducer=(state=initialState, action)=>{

    switch (action.type) {


        //if any of below actions encounted
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case SET_NEW_PASSWORD_REQUEST:
            return{ ...state, isLoading:true, error:null, success:null}; //return these states


        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{...state, isLoading:false, error:null, success:"Register Success", jwt:action.payload, user:action.payload};// add jwt in local storage
        

        case GET_USER_SUCCESS:
            return{...state, isLoading:false, user:action.payload};
            
         case RESET_PASSWORD_SUCCESS:
             return { ...state, isLoading: false, success: "Password reset email sent!", error: null }; 
         
        case SET_NEW_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, success: "Password reset successful!", error: null };

        
            case REGISTER_FALIURE:
            case LOGIN_FALIURE:
            case GET_USER_FALIURE:
               return{...state, isLoading:false, error:action.payload, success:null}

            case LOGOUT:
                return {...initialState};
    
        default:
            return state;
    }

}
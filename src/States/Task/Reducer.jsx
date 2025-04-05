import { all } from "axios";
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_ALL_TASK_FAILURE, GET_ALL_TASK_REQUEST, GET_ALL_TASK_SUCCESS, GET_TODAYS_TASK_FAILURE, GET_TODAYS_TASK_REQUEST, GET_TODAYS_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionType"
import { LOGOUT } from "../Authentication/ActionType";

const initialState={
    allTasks:[],
    todaysTasks:[],
    error: null,
    message: "",
    isLoading: false
}

export const taskReducer=(state = initialState, action)=>{

    switch(action.type){

        case CREATE_TASK_REQUEST:
        case GET_ALL_TASK_REQUEST:
        case DELETE_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:
        case GET_TODAYS_TASK_REQUEST:
            return{...state, isLoading:true};


        case CREATE_TASK_SUCCESS:
            return{
                ...state, isLoading:true, 
                allTasks: [...state.allTasks, action.payload],
                message: "task created success"
            };
        
        case UPDATE_TASK_SUCCESS:
            return{
                ...state, isLoading:false,
                allTasks : state.allTasks.map( task=> 
                    task.id === action.payload.id? action.payload: task),
                message: "task updated success"
            };

        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                allTasks: state.allTasks.filter( task=> task.id !== action.payload),
                message:"task deleted success"
            };

        case GET_ALL_TASK_SUCCESS:
            return{
                ...state,
                allTasks: action.payload,
                message: 'fetched all tasks'
            }

        case  GET_TODAYS_TASK_SUCCESS:
            return{
                ...state,
                isLoading:false,
                todaysTasks: action.payload,
                message:'todays tasks fetched'
            }


         case  CREATE_TASK_FAILURE:
         case  DELETE_TASK_FAILURE:
         case  UPDATE_TASK_FAILURE:
         case  GET_ALL_TASK_FAILURE:
         case  GET_TODAYS_TASK_FAILURE:
            return{
             ...state, isLoading: false, error: action.payload 
            };
        
            case LOGOUT:
                return{
                    allTasks:[],
                    todaysTasks:[]
                }
     
        default: 
          return state;      
    }

}
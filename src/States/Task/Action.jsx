import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_ALL_TASK_FAILURE, GET_ALL_TASK_REQUEST, GET_ALL_TASK_SUCCESS, GET_TODAYS_TASK_FAILURE, GET_TODAYS_TASK_REQUEST, GET_TODAYS_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../Config/api"
import toast from "react-hot-toast";

//create task
export const createTask=(reqData) => async(dispatch)=>{
    dispatch({type: CREATE_TASK_REQUEST});

    try {
        const {data}= await api.post('/api/task/create', reqData.data,{
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        });
        
        dispatch({type: CREATE_TASK_SUCCESS, payload:data});
        console.log('task created', data)
        toast.success('task created !');
        
    } catch (error) {
        dispatch({type: CREATE_TASK_FAILURE, error})
        console.log("error ", error);

    }
}

//update task
export const updateTask=(reqData) => async(dispatch)=>{
    dispatch({type: UPDATE_TASK_REQUEST});

    try {
        const {data}= await api.put(`/api/task/update/${reqData.taskId}`, reqData.data,{
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        });
        
        dispatch({type: UPDATE_TASK_SUCCESS, payload:data});
        console.log('task updated successfuly', data)
        toast.success('task updated!')
        
    } catch (error) {
        dispatch({type: UPDATE_TASK_FAILURE, error})
        console.log("error ", error);

    }
}

//delete task
export const deletetask=(taskId,jwt) => async(dispatch)=>{
    dispatch({type: DELETE_TASK_REQUEST});

    try {
        const response= await api.delete(`/api/task/delete/${taskId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({type: DELETE_TASK_SUCCESS, payload:response});
        console.log('task deleted success', response.data)
        toast.success('task deleted!')
        
    } catch (error) {
        dispatch({type: DELETE_TASK_FAILURE, error})
        console.log("error ", error);

    }
}

//get all tasks
export const getAllTasks=(jwt) => async(dispatch)=>{
    dispatch({type :GET_ALL_TASK_REQUEST});

    try {
        const {data}= await api.get(`/api/task/all`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({type: GET_ALL_TASK_SUCCESS, payload:data});
        console.log('all tasks list', data)
        
    } catch (error) {
        dispatch({type: GET_ALL_TASK_FAILURE, payload:error})
        console.log("error ", error);
    }
}

//get all tasks for today
export const getAllTodayTasks=(jwt) => async(dispatch)=>{
    dispatch({type: GET_TODAYS_TASK_REQUEST});

    try {
        const {data}= await api.get(`/api/task/all-today`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({type: GET_TODAYS_TASK_SUCCESS, payload:data});
        console.log(' today tasks list', data)
        
    } catch (error) {
        dispatch({type: GET_TODAYS_TASK_FAILURE, payload:error})
        console.log("error ", error);
    }
}

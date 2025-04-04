import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./States/Authentication/Reducer";
import { thunk } from "redux-thunk";
import { taskReducer } from "./States/Task/Reducer";


//root reducer
const rootReducer= combineReducers({
    auth: authReducer, 
    task: taskReducer
})

//create the redux store with redux thunk middleware
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));


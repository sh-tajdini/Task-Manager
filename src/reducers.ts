import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./reducers/Task/taskReducer";
import userReducer from "./reducers/Users/userReducer";

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { createSlice } from "@reduxjs/toolkit";
import { TaskStoreType } from "../../schema/task";
import addTask from "./addTask";
import updateTask from "./updateTask";

const initialState: TaskStoreType = {
  requestPending: false,
  tasksInfo: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    ...addTask,
    ...updateTask,
  },
});
const { actions, reducer } = taskSlice;
export const { AddTask, SuccessfulAddTask, FailedAddTask } = actions;

export const {  UpdateTask,  SuccessfulUpdateTask,  FailedUpdateTask} = actions;

export default reducer;

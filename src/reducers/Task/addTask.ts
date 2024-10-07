import { AddTaskActionType, TaskStoreType } from "../../schema/task";

const addTask = {
  AddTask: (state: TaskStoreType, _action: AddTaskActionType) => {
    state.requestPending = true;
    return state;
  },
  SuccessfulAddTask: (state: TaskStoreType, action: AddTaskActionType) => {
    state.requestPending = false;
    state.tasksInfo = [...state.tasksInfo, action.payload.task];

    action.payload.successCallback();
    return state;
},

  FailedAddTask: (state: TaskStoreType, _action: AddTaskActionType) => {
    state.requestPending = false;
    return state;
  },
};

export default addTask;




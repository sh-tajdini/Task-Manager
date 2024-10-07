
import { TaskStoreType, UpdateTaskActionType} from "../../schema/task";

const updateTask = {
  UpdateTask: (state: TaskStoreType, _action: UpdateTaskActionType ) => {
    state.requestPending = true;
    return state;
  },

  SuccessfulUpdateTask: ( state: TaskStoreType, action: UpdateTaskActionType ) => {
    state.requestPending = false;
    state.tasksInfo = state.tasksInfo.map((task) =>
      task.id === action.payload.task.id ? action.payload.task : task
    );

    return state;
  },
  FailedUpdateTask: (state: TaskStoreType, _action: UpdateTaskActionType ) => {
    state.requestPending = false;
    return state;
  },
};

export default updateTask;
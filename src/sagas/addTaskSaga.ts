import { put, takeEvery } from "redux-saga/effects";
import {
  SuccessfulAddTask,
  FailedAddTask,
  AddTask,
} from "../reducers/Task/taskReducer";
import { AddTaskActionType } from "../schema/task";

function* onAddTask(action: AddTaskActionType): Generator {
  try {
    const taskData = action.payload.task;
    const response = { data: taskData };
    yield put({
      type: SuccessfulAddTask.type,
      payload: {
        ...action.payload,
        task: response.data,
      },
    });
  } catch (error) {
    console.error("Error adding task", error);
    yield put({ type: FailedAddTask.type, payload: {} });
  }
}

export default function* addTaskSaga(): Generator {
  yield takeEvery(AddTask.type, onAddTask);
}




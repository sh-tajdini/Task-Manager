import { put, takeEvery } from "redux-saga/effects";
import {
  SuccessfulUpdateTask,
  FailedUpdateTask,
  UpdateTask,
} from "../reducers/Task/taskReducer";
import { UpdateTaskActionType } from "../schema/task";

function* onUpdateTask(action: UpdateTaskActionType): Generator {
  try {
    const taskData = action.payload.task;
    const response = { data: taskData };
    yield put({
      type: SuccessfulUpdateTask.type,
      payload: {
        ...action.payload,
        task: response.data,
      },
    });

  } catch (error) {
    console.error("Error updating task status", error);
    yield put({ type: FailedUpdateTask.type });
  }
}

export default function* updateTaskSaga(): Generator {
  yield takeEvery(UpdateTask.type, onUpdateTask);
}
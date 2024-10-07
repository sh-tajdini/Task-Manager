import { all, fork } from "redux-saga/effects";
import addTaskSaga from "./sagas/addTaskSaga";
import loginSaga from "./sagas/loginSaga";
import updateTaskSaga from "./sagas/updateTaskSaga";

function* mySaga(): Generator {
  try {
    yield all([fork(addTaskSaga), fork(loginSaga), fork(updateTaskSaga)]);
  } catch (error) {
    mySaga();
  }
}
export default mySaga;

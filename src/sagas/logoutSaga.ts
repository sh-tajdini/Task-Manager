import { put, takeEvery } from "redux-saga/effects";
import { logoutUser } from "../reducers/Users/userReducer";

// Function to handle the logout process
function* onLogout() {
  try {
    console.log("Logging out...");
    yield put(logoutUser());
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Main saga function to watch for logout actions
export default function* userSaga() {
  yield takeEvery("user/logoutUser", onLogout);
}

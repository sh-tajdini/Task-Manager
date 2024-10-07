import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  failedLogin,
  loginUser,
  successfulLogin,
} from "../reducers/Users/userReducer";
import { mockedUsers, UserType } from "../schema/users";

const mockUsers: UserType[] = mockedUsers;

function* onLogin(action: PayloadAction<{ username: string; password: string }>) {
  try {
    if (!action.payload || !action.payload.username || !action.payload.password) {
      throw new Error("Invalid payload");
    }

    const user = mockUsers.find(
      (user) =>
        user.username === action.payload.username &&
        user.password === action.payload.password
    );

    if (user) {
      yield put(successfulLogin({ user }));
    } else {
      yield put(failedLogin());
    }
  } catch (error) {
    console.error("Login error:", error);
    yield put(failedLogin());
  }
}

export default function* userSaga() {
  yield takeEvery(loginUser.type, onLogin);
}

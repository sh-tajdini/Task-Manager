import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../schema/users";

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
      state,
       _action: PayloadAction<{ username: string; password: string }>,

    ) => {
      state.error = null; 
    },
    successfulLogin: (
      state,
      action: PayloadAction<{ user: User }>,
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.error = null;
    },
    failedLogin: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = "Login failed";
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { loginUser, successfulLogin, failedLogin, logoutUser } = userSlice.actions;
export default userSlice.reducer;

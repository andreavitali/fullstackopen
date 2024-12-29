import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification, NotificationTypes } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    initUser(state, action) {
      const loggedUser = window.localStorage.getItem("loggedUser");
      if (loggedUser) {
        const user = JSON.parse(loggedUser);
        blogService.setToken(user.token);
        return user;
      }
      return null;
    },
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    }
  }
});

export const loginUser = user => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      dispatch(login(loggedUser));
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", NotificationTypes.ERROR));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    dispatch(logout());
  };
};

export const { login, logout, initUser } = loginSlice.actions;
export default loginSlice.reducer;

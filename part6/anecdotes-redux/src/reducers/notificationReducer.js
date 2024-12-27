import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    display(state, action) {
      return action.payload;
    },
    hide(state, action) {
      return null;
    }
  }
});

export const setNotification = (message, time = 5) => {
  return async dispatch => {
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    dispatch(display(message));
    timeout = setTimeout(() => dispatch(hide()), time * 1000);
  };
};

export const { display, hide } = notificationSlice.actions;
export default notificationSlice.reducer;

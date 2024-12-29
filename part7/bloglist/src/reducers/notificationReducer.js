import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, type: null },
  reducers: {
    display(state, action) {
      return action.payload;
    },
    hide(state, action) {
      return { message: null, type: null };
    }
  }
});

export const setNotification = (message, type, time = 5) => {
  return async dispatch => {
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    dispatch(display({ message, type }));
    timeout = setTimeout(() => dispatch(hide()), time * 1000);
  };
};

export const NotificationTypes = {
  ERROR: 0,
  SUCCESS: 1
};

export const { display, hide } = notificationSlice.actions;
export default notificationSlice.reducer;

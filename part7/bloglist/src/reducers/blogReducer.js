import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification, NotificationTypes } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initialize(state, action) {
      return action.payload;
    },
    append(state, action) {
      return state.concat(action.payload);
    },
    remove(state, action) {
      return state.filter(b => b.id !== action.payload.id);
    },
    update(state, action) {
      return state.map(b => (b.id === action.payload.id ? action.payload : b));
    }
  }
});

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(initialize(blogs));
  };
};

export const createBlog = blogData => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blogData);
      dispatch(append(createdBlog));
      dispatch(setNotification(`Blog ${createdBlog.title} added successfully!`, NotificationTypes.SUCCESS));
    } catch (error) {
      dispatch(setNotification(error.message, NotificationTypes.ERROR));
    }
  };
};

export const removeBlog = blogToRemove => {
  return async dispatch => {
    try {
      await blogService.remove(blogToRemove.id);
      dispatch(remove(blogToRemove));
      dispatch(setNotification(`Blog ${blogToRemove.title} deleted successfully!`, NotificationTypes.SUCCESS));
    } catch (error) {
      dispatch(setNotification(error.message, NotificationTypes.ERROR));
    }
  };
};

export const updateBlog = blogToUpdate => {
  return async dispatch => {
    try {
      await blogService.update(blogToUpdate);
      dispatch(update(blogToUpdate));
      dispatch(setNotification(`Blog ${blogToUpdate.title} updated successfully!`, NotificationTypes.SUCCESS));
    } catch (error) {
      dispatch(setNotification(error.message, NotificationTypes.ERROR));
    }
  };
};

export const { initialize, append, remove, update } = blogSlice.actions;
export default blogSlice.reducer;

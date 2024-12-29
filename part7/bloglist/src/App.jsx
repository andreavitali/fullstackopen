import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";
import Blogs from "./components/Blogs";
import { setNotification, NotificationTypes } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogReducer";
import { initUser, logoutUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    dispatch(initUser());
  }, []);

  return (
    <div>
      <h1>Blog App</h1>
      <Notification />
      <Routes>
        <Route exact path="/" element={<Blogs />} />
      </Routes>
    </div>
  );
};

export default App;

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";
import Home from "./components/Home";
import Users from "./components/Users";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { setNotification, NotificationTypes } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogReducer";
import { initUser, logoutUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();

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
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

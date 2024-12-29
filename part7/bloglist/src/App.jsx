import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";
import BlogList from "./components/BlogList";
import { setNotification, NotificationTypes } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogReducer";
import { initUser, logoutUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector(state => state.login);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    dispatch(initUser());
  }, []);

  const handleLogoutBtn = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1>Blog List</h1>
      <Notification />
      {user === null ? (
        <>
          <Togglable buttonLabel="log in">
            <LoginForm />
          </Togglable>
        </>
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogoutBtn}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm toggleRef={blogFormRef} />
          </Togglable>
          <h2>Blogs</h2>
          <BlogList currentUsername={user.username} />
        </div>
      )}
    </div>
  );
};

export default App;

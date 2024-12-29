import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import LoginForm from "./Login";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import Togglable from "./Toggable";

const Blogs = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);
  const blogFormRef = useRef();

  const handleLogoutBtn = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return user === null ? (
    <LoginForm />
  ) : (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogoutBtn}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      <h2>Blogs</h2>
      <BlogList />
    </div>
  );
};

export default Blogs;

import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const blogFormRef = useRef();

  const showErrorMessage = message => {
    setMessage(`ERROR: ${message}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLogin = async user => {
    try {
      const loggedUser = await loginService.login(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    } catch (exception) {
      showErrorMessage("Wrong credentials");
    }
  };

  const handleLogout = () => {
    blogService.setToken(null);
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const sortByLikes = (a, b) => b.likes - a.likes;

  const createBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(newBlog);
      setMessage(`Blog ${createdBlog.title} added successfully!`);
      setBlogs(blogs.concat(createdBlog));
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const updateBlog = async blogToUpdate => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate);
      setMessage(`Blog ${updatedBlog.title} updated successfully!`);
      const allBlogs = blogs.map(b => (b.id === updateBlog.id ? updateBlog : b));
      setBlogs(allBlogs.sort(sortByLikes));
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const deleteBlog = async blogToDelete => {
    try {
      if (window.confirm(`Do you really want to delete blog ${blogToDelete.title}?`)) {
        await blogService.remove(blogToDelete.id);
        setMessage(`Blog ${blogToDelete.title} deleted successfully!`);
        setBlogs(blogs.filter(b => b.id !== blogToDelete.id));
      }
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={message} />
      {user === null ? (
        <>
          <Togglable buttonLabel="log in">
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        </>
      ) : (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout} type="submit">
              logout
            </button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.sort(sortByLikes).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              currentUsername={user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

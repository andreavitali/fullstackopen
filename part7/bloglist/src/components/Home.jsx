import { useRef } from "react";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import Togglable from "./Toggable";

const Home = () => {
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      <h2>Blogs</h2>
      <BlogList />
    </>
  );
};

export default Home;

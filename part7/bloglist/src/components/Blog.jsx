import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { removeBlog, updateBlog } from "../reducers/blogReducer";

const Blog = ({ blog, currentUsername }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleVisibility = () => setVisible(!visible);

  const increaseLikes = () => {
    const newLikesCount = blog.likes + 1;
    dispatch(updateBlog({ ...blog, likes: newLikesCount }));
  };

  const handleDeleteBtn = event => {
    event.preventDefault();
    if (window.confirm(`Do you really want to delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div data-testid="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button>
      {visible && (
        <div>
          <p className="url">({blog.url})</p>
          <p data-testid="likes" className="likes">
            {blog.likes} likes{" "}
            <button data-testid="like-button" id="like-button" onClick={increaseLikes}>
              like
            </button>
          </p>
          <p>
            Created by {blog.user?.name}
            {blog.user?.username === currentUsername && (
              <button id="remove-button" onClick={handleDeleteBtn}>
                remove
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUsername: PropTypes.string
};

export default Blog;

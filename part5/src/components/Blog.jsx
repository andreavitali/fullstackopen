import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog, currentUsername }) => {
  const [visible, setVisible] = useState(false);
  const [userLikes, setUserLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleVisibility = () => setVisible(!visible);

  const increaseLikes = () => {
    const newLikesCount = userLikes + 1;
    setUserLikes(newLikesCount);
    updateBlog({ ...blog, likes: newLikesCount });
  };

  return (
    <div data-testid="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button>
      {visible && (
        <div>
          <p className="url">({blog.url})</p>
          <p data-testid="likes" className="likes">
            {userLikes} likes{" "}
            <button data-testid="like-button" id="like-button" onClick={increaseLikes}>
              like
            </button>
          </p>
          <p>
            Created by {blog.user?.name}
            {blog.user?.username === currentUsername && (
              <button id="remove-button" onClick={() => deleteBlog(blog)}>
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
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  currentUsername: PropTypes.string
};

export default Blog;

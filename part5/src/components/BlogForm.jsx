import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = event => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input type="text" placeholder="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author:
          <input type="text" placeholder="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url:
          <input type="text" placeholder="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default BlogForm;

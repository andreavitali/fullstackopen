import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = ({ currentUsername }) => {
  const blogs = useSelector(state => state.blog);
  const sortByLikes = (a, b) => b.likes - a.likes;

  return [...blogs].sort(sortByLikes).map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      //updateBlog={updateBlog}
      //deleteBlog={deleteBlog}
      currentUsername={currentUsername}
    />
  ));
};

export default BlogList;

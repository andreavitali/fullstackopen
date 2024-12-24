const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(b => b.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

const loginUser = {
  username: "root",
  name: "root",
  password: "secret"
};

module.exports = { initialBlogs, blogsInDB, usersInDB, loginUser };

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

// Endpoints
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  if (!body.likes) body.likes = 0;
  const blog = new Blog({ ...body, user: user });
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { user } = request;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    response.status(404).json({ error: "blog not found" });
  }
  if (blog.user.toString() === user._id.toString()) {
    await blog.deleteOne();
    response.status(204).end();
  } else {
    response.status(403).json({ error: "logged user is not the creator of the blog" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  };
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(result.toJSON());
});

module.exports = blogsRouter;

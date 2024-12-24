const maxBy = require("lodash/maxBy");
const groupBy = require("lodash/groupBy");
const mapValues = require("lodash/mapValues");

const _ = require("lodash");

const totalLikes = blogs => {
  return blogs.reduce((acc, b) => acc + b.likes, 0);
};

const favoriteBlog = blogs => {
  return blogs.length === 0 ? {} : blogs.reduce((acc, b) => (b.likes > acc.likes ? b : acc), blogs[0]);
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return {};

  const g = groupBy(blogs, "author");
  const mapG = mapValues(g, v => v.length);
  const [author, count] = maxBy(Object.entries(mapG), ([a, c]) => c);
  return { author: author, blogs: count };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return {};
  const { author, likes } = maxBy(blogs, "likes");
  return { author: author, likes: likes };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

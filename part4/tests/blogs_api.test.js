const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const test_helper = require("../utils/test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await Promise.all(test_helper.initialBlogs.map(b => new Blog(b).save()));
});

describe("Get blog information", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, test_helper.initialBlogs.length);
  });

  test("the first note is about React", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map(e => e.title);
    assert(titles.includes(test_helper.initialBlogs[0].title));
  });
});

describe("Save blog information", () => {
  let headers;

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash(test_helper.loginUser.password, 10);
    const user = new User({
      username: test_helper.loginUser.username,
      name: test_helper.loginUser.name,
      passwordHash
    });
    await user.save();
    const result = await api.post("/api/login").send(test_helper.loginUser);
    headers = { Authorization: `Bearer ${result.body.token}` };
  });

  test("A valid blog can be added", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    };

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await test_helper.blogsInDB();
    assert.equal(allBlogs.length, test_helper.initialBlogs.length + 1);

    const contents = allBlogs.map(n => n.title);
    assert(contents.includes(newBlog.title));
  });

  test("If the likes property is missing, it will default to 0 ", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    };

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await test_helper.blogsInDB();
    const addedBlog = allBlogs.find(b => b.title === newBlog.title);
    assert(addedBlog.likes === 0);
  });

  test("If title and url are missing, respond with 400 bad request", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra"
    };

    await api.post("/api/blogs").set(headers).send(newBlog).expect(400);
  });
});

describe("Delete a blog", () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash(test_helper.loginUser.password, 10);
    const user = new User({
      username: test_helper.loginUser.username,
      name: test_helper.loginUser.name,
      passwordHash
    });
    await user.save();
  });

  test("Delete if id exists", async () => {
    const blogsAtStart = await test_helper.blogsInDB();

    const result = await api.post("/api/login").send(test_helper.loginUser);
    headers = { Authorization: `Bearer ${result.body.token}` };

    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    };

    const response = await api.post("/api/blogs").set(headers).send(newBlog);

    const blogsAfterAdd = await test_helper.blogsInDB();
    assert(blogsAtStart.length + 1 == blogsAfterAdd.length);

    await api.delete(`/api/blogs/${response.body.id}`).set(headers).expect(204);

    const finalBlogs = await test_helper.blogsInDB();
    assert(finalBlogs.length == blogsAfterAdd.length - 1);
  });
});

describe("Update blog information", () => {
  test("Update successfully", async () => {
    const blogsAtStart = await test_helper.blogsInDB();
    const blogToUpdate = { ...blogsAtStart[0] };
    blogToUpdate.likes++;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const finalBlogs = await test_helper.blogsInDB();
    const updatedBlog = finalBlogs.find(b => b.id === blogToUpdate.id);
    assert.deepStrictEqual(updatedBlog, blogToUpdate);
  });
});

after(async () => await mongoose.connection.close());

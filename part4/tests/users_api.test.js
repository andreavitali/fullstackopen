const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const test_helper = require("../utils/test_helper");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("super_password", 10);
    const user = new User({
      username: "avitali",
      name: "Andrea Vitali",
      passwordHash
    });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await test_helper.usersInDB();

    const newUser = {
      username: "User1",
      name: "Name Surname",
      password: "password"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await test_helper.usersInDB();

    const newUser = {
      username: usersAtStart[0].username,
      name: "Name Surname",
      password: "password"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helper.usersInDB();
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => await mongoose.connection.close());

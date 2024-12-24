const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const app = express();
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const userRouters = require("./controllers/users");
const loginRouters = require("./controllers/login");

const url = config.MONGODB_URI;
logger.info("connecting to", url);
mongoose
  .connect(url, {})
  .then(() => logger.info("connected to mongodb"))
  .catch(error => console.error("error connecting to mongodb: " + error));
mongoose.set("strictQuery", false);

//app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(middleware.tokenExtractor);

// Controllers
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouters);
app.use("/api/login", loginRouters);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// Error handlers
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

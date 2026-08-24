const express = require("express");
const fs = require("fs");

const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb:127.0.0.1:27017/youtube-app-1");
//Schema
const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// Middleware 1 => Through video
app.use(logReqRes(log.txt));

// Middleware 2 => Practice 1
app.use((req, res, next) => {
  console.log("Hello from Middleware 2", req.myUserName);
  next();
});

// Rest API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  res.setHeader("X-MyName", "Zahid"); //Custom Header
  // Always add X to custom headers
  console.log("Hello from Route", req.myUserName);
  res.json(allDbUsers);
});

// 1. GET ALL USERS (HTML VIEW)

app.use("/user", userRouter);
// Will use POSTMAN for POST PATCH DELETE
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// PATCH AND DELETE REQUEST ASSIGNMENT
// PATCH AND DELETE REQUEST ASSIGNMENT

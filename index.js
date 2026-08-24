const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));
// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

//Schema
const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// Middleware 1 => Through video
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.ip}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      req.myUserName = "Zahid_majeed";
      next();
    },
  );
  // next();
});

// Middleware 2 => Practice 1
app.use((req, res, next) => {
  console.log("Hello from Middleware 2", req.myUserName);
  next();
});

//Routes
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Zahid"); //Custom Header
  // Always add X to custom headers
  console.log("Hello from Route", req.myUserName);
  res.json(users);
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// app.get("/api/users/:gender", (req, res) => {
//   const gender = req.params.gender;
//   const user = users.find((user) => user.gender === gender);
//   return res.json(user);
// });

// app.get("/api/users/:id", (req, res) => {
//   const id = req.params.id;
//   const user = users.find((users) => users.id === id);
//   return res.json(user);
// });
// 1. GET ALL USERS (HTML VIEW)
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
  ${allDbUsers.map((user) => `<li> ${user.email}</li>`).join("")} 
 
 </ul> `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((users) => users.id === id);
    return res.json(user);
  })

  .patch((req, res) => {
    //TODO: Edit users with id
    return res.json({ status: "pending" });
  });

//   .delete((req, res) => {
//     //TODO: Delete the users with id
//     return res.json({ status: "pending" });
//   });
// 2. CREATE USER
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ msg: "All fields are req..." });
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });
  return res.status(201).json({ msg: "Success" });

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json({ status: "Success", id: users.length + 1 });
  // });
  // Now we add MongoDB
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ status: "User not found" });
  }
  users.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(200).json({ status: "Success", id: id });
  });
});

// Will use POSTMAN for POST PATCH DELETE
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// PATCH AND DELETE REQUEST ASSIGNMENT
// PATCH AND DELETE REQUEST ASSIGNMENT

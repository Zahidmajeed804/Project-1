const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
//Routes
app.get("/api/users", (req, res) => {
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
app.get("/users", (req, res) => {
  const html = `
  <>
  ${users
    .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
    .join("")} 
  `;
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
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("body", body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length + 1 });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ status: "User not found" });
  }
  users.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: id });
  });
});

// Will use POSTMAN for POST PATCH DELETE
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// PATCH AND DELETE REQUEST ASSIGNMENT

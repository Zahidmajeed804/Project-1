const express = require("express");

const router = express.Router();

// router.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//   <ul>
//   ${allDbUsers.map((user) => `<li> ${user.email}</li>`).join("")}

//  </ul> `;
//   res.send(html);
// });

router
  .route("/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    //TODO: Edit users with id
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
    return res.json({ status: "Success" });
  })

  .delete(async (req, res) => {
    //TODO: Delete the users with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });
// 2. CREATE USER
router.post("/", async (req, res) => {
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

module.exports = router;

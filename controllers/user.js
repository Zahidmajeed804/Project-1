const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await UserActivation.find({});
  return res.json(allDbUsers);
}

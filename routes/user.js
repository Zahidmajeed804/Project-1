const express = require("express");
const {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
} = require("../controllers/user");
const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateUserById);

router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)

  .delete(handleDeleteUserById);
// 2. CREATE USER

module.exports = router;

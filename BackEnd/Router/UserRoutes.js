  const express = require("express");
  const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } = require("../Controller/UserController");

  const JWTverify = require("../Middleware/Jwtverify");

  const router = express.Router();

  // All routes are protected
  router.use(JWTverify);

  // GET all users
  router.get("/", getAllUsers);

  // GET user by ID
  router.get("/:id", getUserById);

  // UPDATE user
  router.put("/:id", updateUser);

  // DELETE user
  router.delete("/:id", deleteUser);

  module.exports = router;

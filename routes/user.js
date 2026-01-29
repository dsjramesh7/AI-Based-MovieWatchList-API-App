const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/user.controller");

router.post("/register-user", registerUser);
router.post("login-user", loginUser);
router.patch("/update-user", updateUser);

module.exports = router;

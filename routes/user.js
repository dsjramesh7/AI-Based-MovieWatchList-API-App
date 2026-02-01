const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization");

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/update-user", authorization, updateUser);

module.exports = router;

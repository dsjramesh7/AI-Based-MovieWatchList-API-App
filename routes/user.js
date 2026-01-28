const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");

router.post("/register-user", registerUser);
router.post("login-user", loginUser);

module.exports = router;

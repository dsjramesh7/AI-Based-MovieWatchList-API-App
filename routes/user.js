const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");

router.post("/register-user", registerUser);

module.exports = router;

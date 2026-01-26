const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email Already Exists"],
      required: [true, "Email is Required"],
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Users", UserSchema);

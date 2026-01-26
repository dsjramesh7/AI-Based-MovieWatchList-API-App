const { StatusCodes } = require("http-status-codes");
const UserSchema = require("../model/UserSchema");

//Register User
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("RegisterUserDataSending: ".data);
    if (!data.name || !data.email || !data.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email and Name and Password is required For Registration",
      });
    }
    const newUser = await UserSchema.create(data);
    res.status(StatusCodes.CREATED).json({
      message: "User created Successfully",
      payloadData: newUser,
    });
  } catch (error) {
    console.log("ServerSide Issue: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser };

const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
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
    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(process.env.SALT_ROUNDS),
    );
    const newUser = await UserSchema.create({
      ...data,
      password: hashedPassword,
    });
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

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email || !data.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email and Password is required",
      });
    }
    const user = await UserSchema.findOne({ email: data.email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User Not Found!!",
      });
    }
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Incorrect Password",
      });
    }
    const userToJSObject = user.toObject();
    const { password: hashedPassword, ...remainingData } = userToJSObject;

    res.status(StatusCodes.OK).json({
      message: "Login is Successful",
      user: remainingData,
    });
  } catch (error) {
    console.log("loginIssue: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {};

module.exports = { registerUser, loginUser, updateUser };

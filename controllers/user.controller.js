const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const UserSchema = require("../model/UserSchema");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    console.log("token", token);

    const userToJSObject = user.toObject();
    const { password: hashedPassword, ...remainingData } = userToJSObject;

    res.status(StatusCodes.OK).json({
      message: "Login is Successful",
      user: remainingData,
      token: token,
    });
  } catch (error) {
    console.log("loginIssue: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("updateUserDetails", req.user);
    const { id } = req.user;
    const data = req.body;
    console.log("updateData: ", data);
    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide data",
      });
    }
    const user = await UserSchema.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User Not Found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "User Profile is updated Successfully",
      user: user,
    });
  } catch (error) {
    console.log("ErrorUpdate: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log("req.userOfGet: ", req.user);
    const { id } = req.user;
    const user = await UserSchema.findById(id).select("-password");
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User Not Found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "User Profile is fetched Successfully",
      user: user,
    });
  } catch (error) {
    console.log("getUser Error: ", error);
  }
};

module.exports = { registerUser, loginUser, updateUser, getUserProfile };

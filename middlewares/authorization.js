const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "please provide token",
    });
  }

  const authToken = authHeader.split(" ")[1];
  console.log("AuthToken: ", authToken);
  const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
  console.log("DecodedToken", decodedToken);
  req.user = decodedToken;
  console.log("authreq.user: ", req.user);
  next();
};

module.exports = authorization;

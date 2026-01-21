const logger = (req, res, next) => {
  console.log("logger....");
  console.log("reques method", req.method);
  console.log("reques URL", req.url);
  next();
};

//block middleware why because we want to stop the execution so we are not using next() here in the if scope
const blocker = (req, res, next) => {
  if (req.url === "/blocked") {
    console.log("Request is blocked");
    res.status(403).json({
      success: false,
      message: "The route is blocked by a middleware",
    });
  }
  next();
};

const customHeader = (req, res, next) => {
  console.log("Adding custom Header");
  res.setHeader("X-PoweredBy", "Express");
  next();
};

module.exports = { logger, blocker, customHeader };

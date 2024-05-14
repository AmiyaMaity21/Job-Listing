const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    //  const token = req.cookies.token;
    // const reqHeader = req.header("Authorization").split(" ");
    // const token = reqHeader[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // const isUserValid = User.findById(decode.userId);
    // // req.userId = decode.userId;

    // if (!isUserValid) {
    //   return res.status(401).json({ message: "Unauthorized access" });
    // }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;

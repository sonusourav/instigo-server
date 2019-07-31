const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
  	console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,"codeworkrauthentication");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

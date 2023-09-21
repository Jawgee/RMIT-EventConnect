const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Replace with your actual secret key

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach user information to the request object for use in the updateUser function
    req.user = decoded;

    next();
  });
}
module.exports = {verifyToken, secretKey};
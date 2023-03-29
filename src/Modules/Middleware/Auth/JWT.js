import jwt from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken = (username) => {
  return jwt.sign({name: username}, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

const authenticateToken = (req, res, next) => {
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    throw createError.Unauthorized();
  }
  const user = jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) return;
    return user;
  });
  if (!user) {
    throw createError.Forbidden();
  }
  req["user"] = user;
  next();
};
export { generateAccessToken, authenticateToken };

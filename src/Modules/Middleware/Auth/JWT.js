import jwt from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken = (user) => {
  return jwt.sign({ role: user.role, id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const invalidTokens = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null || invalidTokens.includes(token)) {
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
const logout = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    invalidTokens.push(token);
    res.send("Logged out");
  } catch (error) {
    next(createError(error));
  }
};
export { generateAccessToken, authenticateToken, logout };

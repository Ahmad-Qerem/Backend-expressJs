import jwt from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken = (user) => {
  return jwt.sign({ role: user.role, id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
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

const logout = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    throw createError.Unauthorized();
  }
  const user = jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) return;
    return user;
  });
  console.log("decode:", user);
  try {
    jwt.sign(
      { role: user.role, id: user.id },
      ' ',
      { expiresIn: '1s' },
      (logout, err) => {
        if (logout) {
          res.send({ message: "You have been Logged Out" });
        } else {
          res.send({ message: "Error" });
        }
      }
    );
  } catch (error) {
    next(createError(error));
  }
};
export { generateAccessToken, authenticateToken, logout };

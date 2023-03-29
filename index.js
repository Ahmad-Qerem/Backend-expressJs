import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import userRouts from "./src/Modules/Api/Users/Routers/users.js";

dotenv.config();
const app = express();
app.use(express.json());


app.use("/users", userRouts);

app.use(async (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  if (error.code === "P2025") {
    statusCode = 404;
    error.statusCode = 404;
  }
  res.status(statusCode || 500).send({
    status: false,
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
    errors: error.errors,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server ready at : http://localhost:${PORT}`)
);

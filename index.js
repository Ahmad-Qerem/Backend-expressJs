import dotenv from "dotenv";
import express, { json } from "express";
import userRouts from "./src/Modules/Api/Users/Routers/users.js";
import transactionsRouts from "./src/Modules/Api/Transactions/Routers/transactions.js";
import enumsLanguagesRouts from "./src/Modules/Api/Enums/Languages/Routers/enums.js";
import courtsRouter from "./src/Modules/Api/Courts/Routers/courts.js";
import imagesRouter from "./src/Modules/Api/Images/Routers/images.js";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();
app.use(express.json());
app.use(fileUpload());
app.use("/users", userRouts);
app.use("/transactions", transactionsRouts);
app.use("/enums/languages", enumsLanguagesRouts);
app.use("/courts", courtsRouter);
app.use("/images", imagesRouter);


app.use(async (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  if (error.code === "P2025") {
    statusCode = 404;
    error.statusCode = 404;
  }
  console.log(error.message);
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

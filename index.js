import dotenv from "dotenv";
import express, { json } from "express";
import userRouts from "./src/Modules/Api/Users/Routers/users.js";
import transactionsRouts from "./src/Modules/Api/Transactions/Routers/transactions.js";
import enumsLanguagesRouts from "./src/Modules/Api/Enums/Languages/Routers/enums.js";
import courtsRouter from "./src/Modules/Api/Courts/Routers/courts.js";
import postsRouter from "./src/Modules/Api/Posts/Routers/posts.js";
import bookingsRouts from "./src/Modules/Api/Booking/Routers/booking.js";
import commentsRouter from "./src/Modules/Api/comments/Routers/comments.js";
import newsRouter from "./src/Modules/Api/News/Routers/news.js";
import legalCircularRouter from "./src/Modules/Api/LegalCircular/Routers/legalCircular.js";
import fetch from "node-fetch";
// import { admin } from "./src/Modules/Firebase/firebaseAdmin.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users/bookings", bookingsRouts);
app.use("/users", userRouts);
app.use("/transactions", transactionsRouts);
app.use("/enums", enumsLanguagesRouts);
app.use("/courts", courtsRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/news", newsRouter);
app.use("/legalCircular", legalCircularRouter);

app.use("/images/profile", express.static("data/images/userProfileImages"));
app.use("/images/idImage", express.static("data/images/userIDImages"));
app.use("/images/news", express.static("data/images/news"));

app.post("/sendNotification", async (req, res) => {
  const { title, body} = req.body;

  const message = {
    registration_ids:["cJ5NSUkhJ3R9DTSIu29uCR:APA91bG48nxzAdQKCwRTCXgUcbdd7yo-r4k3MucTqSLPwpCzVR8-q_K2z_aKHZbctm2No1BwGNQ8JVcDeoxcKFFqr5_rLq1I1F5YLsAtIqL9_d3Jlthb3LaZ1ub1lbhwb8Q2GmQcqOOr"],
    notification: {
      title,
      body,
    },
  };

  try {
    // const response = await admin.messaging().send(message);
    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + "AAAAIkWVu78:APA91bGe3IecQ6HL8WxzrD2WT7Wdm_tq1EiKopOA2OK1TLCr-tpAOSWrFncRbvOERR4MN2cHM4Os0OTLWzBHo4FOqCc3PuRet8-H20anboPMp7ApCLZEUf5bCk6-98LrD59zlIhsrU5m",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(message)
    });
    res.send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Error sending notification");
  }
});

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

import express from "express";
import { authenticateToken}  from "../../../Middleware/Auth/JWT.js";
import {
  getAllUserBookingsController,
  createBookingController,
  getBookingByIDController,
  updateBookingController,
  deleteBookingController,
} from "../Controllers/bookingControllers.js";

const router = express.Router();
router.get("", authenticateToken,getAllUserBookingsController);
router.post("", authenticateToken,createBookingController);
router.get("/:id",authenticateToken, getBookingByIDController);
router.put("/:id", authenticateToken,updateBookingController);
router.delete("/:id",authenticateToken, deleteBookingController);

export default router;

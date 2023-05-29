import express from "express";
import { authenticateToken } from "../../../Middleware/Auth/JWT.js";

import {
  getAllCourtsController,
  getCourtController,
} from "../Controllers/courtsControllers.js";
const router = express.Router();
router.get("", authenticateToken, getAllCourtsController);
router.get("/:id", authenticateToken, getCourtController);
export default router;

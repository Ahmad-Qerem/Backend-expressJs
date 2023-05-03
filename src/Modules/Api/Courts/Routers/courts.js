import express from "express";
import { authenticateToken } from "../../../Middleware/Auth/JWT.js";

import {
  getAllCourtsController,
  createCourtController,
  getCourtController,
  updateCourtController,
  deleteCourtController
} from "../Controllers/courtsControllers.js";
const router = express.Router();

router.get("", authenticateToken,getAllCourtsController);
router.post("", authenticateToken,createCourtController);
router.get("/:id",authenticateToken, getCourtController);
router.put("/:id", authenticateToken,updateCourtController);
router.delete("/:id",authenticateToken, deleteCourtController);
 



export default router;
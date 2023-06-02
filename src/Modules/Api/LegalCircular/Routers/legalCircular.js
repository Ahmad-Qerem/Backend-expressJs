import express from "express";
import { authenticateToken } from "../../../Middleware/Auth/JWT.js";
import {
  getAllLegalCircularsController,
  createLegalCircularController,
  getLegalCircularController,
  updateLegalCircularController,
  deleteLegalCircularController,
} from "../Controllers/legalCircularControllers.js";

const router = express.Router();
router.get("", authenticateToken, getAllLegalCircularsController);
router.post("", authenticateToken, createLegalCircularController);
router.get("/:id", authenticateToken, getLegalCircularController);
router.put("/:id", authenticateToken, updateLegalCircularController);
router.delete("/:id", authenticateToken, deleteLegalCircularController);

export default router;

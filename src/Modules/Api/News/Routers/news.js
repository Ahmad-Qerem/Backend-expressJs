import express from "express";
import { authenticateToken } from "../../../Middleware/Auth/JWT.js";
import {
  getAllNewsController,
  createNewController,
  getNewController,
  updateNewController,
  deleteNewController,
} from "../Controllers/newsControllers.js";

const router = express.Router();
router.get("", authenticateToken, getAllNewsController);
router.New("", authenticateToken, createNewController);
router.get("/:id", authenticateToken, getNewController);
router.put("/:id", authenticateToken, updateNewController);
router.delete("/:id", authenticateToken, deleteNewController);

export default router;

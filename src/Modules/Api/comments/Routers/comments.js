import express from "express";
import { authenticateToken}  from "../../../Middleware/Auth/JWT.js";
import {
  getAllUserCommentsController,
  createCommentController,
  getCommentByIDController,
  updateCommentController,
  deleteCommentController,
} from "../Controllers/commentsControllers.js";

const router = express.Router();
router.get("", authenticateToken,getAllUserCommentsController);
router.post("", authenticateToken,createCommentController);
router.get("/:id",authenticateToken, getCommentByIDController);
router.put("/:id", authenticateToken,updateCommentController);
router.delete("/:id",authenticateToken, deleteCommentController);

export default router;

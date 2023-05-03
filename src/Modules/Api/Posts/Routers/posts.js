import express from "express";
import { authenticateToken}  from "../../../Middleware/Auth/JWT.js";
import {
  getAllPostsController,
  createPostController,
  getPostController,
  updatePostController,
  deletePostController,
} from "../Controllers/PostsControllers.js";

const router = express.Router();
router.get("", authenticateToken,getAllPostsController);
router.post("", authenticateToken,createPostController);
router.get("/:id",authenticateToken, getPostController);
router.put("/:id", authenticateToken,updatePostController);
router.delete("/:id",authenticateToken, deletePostController);

export default router;

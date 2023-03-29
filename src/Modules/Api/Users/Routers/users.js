import express from "express";
import { authenticateToken}  from "../../../Middleware/Auth/JWT.js";
import {
  getAllUsersController,
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  loginController,

} from "../Controllers/userControllers.js";

const router = express.Router();
router.post("/login", loginController);
router.post("/register", createUserController);

router.get("", authenticateToken,getAllUsersController);
router.post("", authenticateToken,createUserController);
router.get("/:id",authenticateToken, getUserController);
router.put("/:id", authenticateToken,updateUserController);
router.delete("/:id",authenticateToken, deleteUserController);

export default router;

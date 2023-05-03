import express from "express";
import { authenticateToken } from "../../../Middleware/Auth/JWT.js";
import {
  getAllUsersController,
  createUserController,
  getUserController,
  updateUserController,
  updateUserProfileImageController,
  deleteUserController,
  loginController,
  logoutController,
} from "../Controllers/userControllers.js";
import { validationResultMiddleware } from "../../../Middleware/Validators/validationResult.js";
import { loginValidator, registerValidator } from "../../../Middleware/Validators/userValidators.js";
import { multerMiddleware } from "../../../Middleware/Utils/multer.js";
const router = express.Router();

router.post(
  "/login",
  loginValidator,
  validationResultMiddleware,
  loginController
);
router.post("/register", multerMiddleware,createUserController);

router.post("/logout",authenticateToken, logoutController);
router.get("", authenticateToken, getAllUsersController);
router.post("", authenticateToken, createUserController);
router.get("/:id", authenticateToken, getUserController);
router.put("/:id", authenticateToken, updateUserController);
router.put("/profileImage/:id",authenticateToken,multerMiddleware, updateUserProfileImageController);

router.delete("/:id", authenticateToken, deleteUserController);

export default router;

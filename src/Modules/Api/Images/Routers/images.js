import express from "express";
import { authenticateToken } from "../../../Middleware/Auth/JWT.js";
import { getImageController } from "../Controllers/imageControllers.js";
const router = express.Router();

router.get("/profile",authenticateToken, getImageController);

export default router;

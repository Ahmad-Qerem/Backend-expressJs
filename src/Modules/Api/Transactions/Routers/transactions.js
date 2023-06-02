import express from "express";
import { authenticateToken}  from "../../../Middleware/Auth/JWT.js";
import {
  getAllTransactionsController,
  createTransactionController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionByUserIdController
} from "../Controllers/transactionsControllers.js";

const router = express.Router();
router.get("", authenticateToken,getAllTransactionsController);
router.get("/user/:id", authenticateToken,getTransactionByUserIdController);
router.post("", authenticateToken,createTransactionController);
router.get("/:id",authenticateToken, getTransactionController);
router.put("/:id", authenticateToken,updateTransactionController);
router.delete("/:id",authenticateToken, deleteTransactionController);

export default router;

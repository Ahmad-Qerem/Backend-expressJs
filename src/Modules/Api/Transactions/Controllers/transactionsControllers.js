import createError from "http-errors";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from "../Services/transactionsServices.js";

const getAllTransactionsController = async (req, res, next) => {
  try {
    const Transactions = await getAllTransactions(req.user.id);
    res.send(Transactions);
  } catch (error) {
    next(createError(error));
  }
};

const createTransactionController = async (req, res, next) => {
  try {
    const data = req.body;
    const newTransactions = await createTransaction(data,req.user);
    res.send(newTransactions);
  } catch (error) {
    next(createError(error));
  }
};

const getTransactionController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await getTransaction(id);
    res.send(transaction);
  } catch (error) {
    next(createError(error));
  }
};
const updateTransactionController = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      id : parseInt( req.params.id),
    };
    const transaction = await updateTransaction(data);
    res.send(transaction);
  } catch (error) {
    next(createError(error));
  }
};

const deleteTransactionController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTransaction = await deleteTransaction(id);
    res.send({
      success: true,
      message: deletedTransaction,
    });
  } catch (error) {
    next(createError(error));
  }
};

export {
  getAllTransactionsController,
  createTransactionController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
};

import createError from "http-errors";
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../Services/postsServices.js";

const getAllPostsController = async (req, res, next) => {
  try {
    const Transactions = await getAllPosts();
    res.send(Transactions);
  } catch (error) {
    next(createError(error));
  }
};

const createPostController = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    const newTransactions = await createPost(data,userId);
    res.send(newTransactions);
  } catch (error) {
    next(createError(error));
  }
};

const getPostController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id; 
    const transaction = await getPost(userId,id);
    res.send(transaction);
  } catch (error) {
    next(createError(error));
  }
};
const updatePostController = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      id : parseInt( req.params.id),
    };
    const transaction = await updatePost(data);
    res.send(transaction);
  } catch (error) {
    next(createError(error));
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTransaction = await deletePost(id);
    res.send({
      success: true,
      message: deletedTransaction,
    });
  } catch (error) {
    next(createError(error));
  }
};

export {
  getAllPostsController,
  createPostController,
  getPostController,
  updatePostController,
  deletePostController,
};

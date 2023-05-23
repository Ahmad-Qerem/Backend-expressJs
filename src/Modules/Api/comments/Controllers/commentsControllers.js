import createError from "http-errors";
import {
  getAllUserComments,
  createComment,
  getCommentByID,
  updateComment,
  deleteComment,
} from "../Services/commentsServices.js";

const getAllUserCommentsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const Comments = await getAllUserComments(userId);
    res.send(Comments);
  } catch (error) {
    next(createError(error));
  }
};

const createCommentController = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    
    const Comment = await createComment(data,userId);
    res.send(Comment);
  } catch (error) {
    next(createError(error));
  }
};

const getCommentByIDController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const Comment = await getCommentByID(userId, id);
    res.send(Comment);
  } catch (error) {
    next(createError(error));
  }
};
const updateCommentController = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      id: parseInt(req.params.id),
    };
    const Comment = await updateComment(data);
    res.send(Comment);
  } catch (error) {
    next(createError(error));
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const Comment = await deleteComment(id);
    res.send({
      success: true,
      message: "comment deleted ",
    });
  } catch (error) {
    next(createError(error));
  }
};

export {
  getAllUserCommentsController,
  createCommentController,
  getCommentByIDController,
  updateCommentController,
  deleteCommentController,
};

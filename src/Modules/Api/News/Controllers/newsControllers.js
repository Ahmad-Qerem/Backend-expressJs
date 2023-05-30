import createError from "http-errors";
import {
  getAllNews,
  createNew,
  getNew,
  updateNew,
  deleteNew,
} from "../Services/newsServices.js";

const getAllNewsController = async (req, res, next) => {
  try {
    const News = await getAllNews();
    res.send(News);
  } catch (error) {
    next(createError(error));
  }
};

const createNewController = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);

    const newsImage = req.files.find(
      (file) => file.fieldname == "newsImage"
    );

    const userId = req.user.id;
    const newNews = await createNew(data,newsImage,userId);
    res.send(newNews);
  } catch (error) {
    next(createError(error));
  }
};

const getNewController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const news = await getNew(id);
    res.send(news);
  } catch (error) {
    next(createError(error));
  }
};
const updateNewController = async (req, res, next) => {
  try {
    const data = req.body;

    const news = await updateNew(data);
    res.send(news);
  } catch (error) {
    next(createError(error));
  }
};

const deleteNewController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTransaction = await deleteNew(id);
    res.send({
      success: true,
      message: deletedTransaction,
    });
  } catch (error) {
    next(createError(error));
  }
};

export  {
  getAllNewsController,
  createNewController,
  getNewController,
  updateNewController,
  deleteNewController,
};

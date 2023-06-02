import createError from "http-errors";
import {
  getAllLegalCirculars,
  createLegalCircular,
  getLegalCircular,
  updateLegalCircular,
  deleteLegalCircular,
} from "../Services/legalCircularServices.js";

const getAllLegalCircularsController = async (req, res, next) => {
  try {
    const legalCircular = await getAllLegalCirculars();
    res.send(legalCircular);
  } catch (error) {
    next(createError(error));
  }
};

const createLegalCircularController = async (req, res, next) => {
  try {
    const data = req.body;
    const LegalCircularLegalCircular = await createLegalCircular(data);
    res.send(LegalCircularLegalCircular);
  } catch (error) {
    next(createError(error));
  }
};

const getLegalCircularController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const LegalCircular = await getLegalCircular(id);
    res.send(LegalCircular);
  } catch (error) {
    next(createError(error));
  }
};
const updateLegalCircularController = async (req, res, next) => {
  try {
    const data = req.body;
    const legalCircular = await updateLegalCircular(data);
    res.send(legalCircular);
  } catch (error) {
    next(createError(error));
  }
};

const deleteLegalCircularController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedLegalCircular = await deleteLegalCircular(id);
    res.send({
      success: true,
      message: deletedLegalCircular,
    });
  } catch (error) {
    next(createError(error));
  }
};

export {
  getAllLegalCircularsController,
  createLegalCircularController,
  getLegalCircularController,
  updateLegalCircularController,
  deleteLegalCircularController,
};

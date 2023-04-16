import createError from "http-errors";
import {
  createCourt,
  deleteCourt,
  getAllCourts,
  getCourt,
  updateCourt,
} from "../Services/courtsServices.js";

const getAllCourtsController = async (req, res, next) => {
  try {
    const Courts = await getAllCourts();
    res.send(Courts);
  } catch (error) {
    next(createError(error));
  }
};

const createCourtController = async (req, res, next) => {
  try {
    const data = req.body;
    const newCourt = await createCourt(data);
    res.send(newCourt);
  } catch (error) {
    next(createError(error));
  }
};

const getCourtController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Court = await getCourt(id);
    res.send(Court);
  } catch (error) {
    next(createError(error));
  }
};
const updateCourtController = async (req, res, next) => {
  try {
    const data = req.body;
    const Court = await updateCourt(data);
    res.send(Court);
  } catch (error) {
    next(createError(error));
  }
};

const deleteCourtController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedCourt = await deleteCourt(id);
    res.send({
      success: true,
      message: deletedCourt,
    });
  } catch (error) {
    next(createError(error));
  }
};

export {
  getAllCourtsController,
  createCourtController,
  getCourtController,
  updateCourtController,
  deleteCourtController,
};

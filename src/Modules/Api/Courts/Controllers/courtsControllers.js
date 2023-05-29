import createError from "http-errors";
import {
  getAllCourts,
  getCourt,
} from "../Services/courtsServices.js";

const getAllCourtsController = async (req, res, next) => {
  try {
    const Courts = await getAllCourts();
    res.send(Courts);
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



export {
  getAllCourtsController,
  getCourtController,
};

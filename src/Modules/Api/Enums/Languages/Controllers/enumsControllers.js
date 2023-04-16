import createError from "http-errors";
import {
  getRoles,
  getAll,
  getGenders,
  getMaritalStatuses,
} from "../Services/enumsServices.js";
const getAllController = (req, res, next) => {
  try {
    res.send(getAll());
  } catch (error) {
    next(createError(error));
  }
};
const getRolesController = (req, res, next) => {
  try {
    const language = res.locals.language;
    res.send(getRoles(language));
  } catch (error) {
    next(createError(error));
  }
};
const getGendersController = (req, res, next) => {
  try {
    const language = res.locals.language;

    res.send(getGenders(language));
  } catch (error) {
    next(createError(error));
  }
};
const getMaritalStatusesController = (req, res, next) => {
  try {
    const language = res.locals.language;
    res.send(getMaritalStatuses(language));
  } catch (error) {
    next(createError(error));
  }
};
export {
  getRolesController,
  getGendersController,
  getMaritalStatusesController,
  getAllController,
};

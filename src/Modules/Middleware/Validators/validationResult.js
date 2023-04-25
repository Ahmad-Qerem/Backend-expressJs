import { matchedData, validationResult } from "express-validator";
import createError from "http-errors";

export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError(422, errors)
    }
    next();
};
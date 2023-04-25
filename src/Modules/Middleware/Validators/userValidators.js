import { body, param } from "express-validator";

export const loginValidator = [
  body("email").exists().isString().notEmpty().withMessage("invalid email"),
  body("password").exists().isString().withMessage("invalid password"),
];

export const registerValidator = [body("data").exists().isJSON()];

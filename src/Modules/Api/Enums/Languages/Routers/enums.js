import express from "express";
import { authenticateToken } from "../../../../Middleware/Auth/JWT.js";
import {
  passArValueToController,
  passEnValueToController,
} from "../../../../Middleware/Utils/language.js";
import {
  getRolesController,
  getGendersController,
  getMaritalStatusesController,
  getAllController,
} from "../Controllers/enumsControllers.js";
const router = express.Router();
router.get(
  "/ar_roles",
  authenticateToken,
  passArValueToController,
  getRolesController
);
router.get(
  "/ar_genders",
  authenticateToken,
  passArValueToController,
  getGendersController
);
router.get(
  "/ar_marital_statuses",
  authenticateToken,
  passArValueToController,
  getMaritalStatusesController
);
router.get(
  "/all",
  authenticateToken,
  passArValueToController,
  getAllController
);
router.get(
  "/en_roles",
  authenticateToken,
  passEnValueToController,
  getRolesController
);
router.get(
  "/en_genders",
  authenticateToken,
  passEnValueToController,
  getGendersController
);
router.get(
  "/en_marital_statuses",
  authenticateToken,
  passEnValueToController,
  getMaritalStatusesController
);
export default router;
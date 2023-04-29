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
  passArValueToController,
  getRolesController
);
router.get(
  "/ar_genders",
  passArValueToController,
  getGendersController
);
router.get(
  "/ar_marital_statuses",
  passArValueToController,
  getMaritalStatusesController
);
router.get(
  "/all",
  passArValueToController,
  getAllController
);
router.get(
  "/en_roles",
  passEnValueToController,
  getRolesController
);
router.get(
  "/en_genders",
  passEnValueToController,
  getGendersController
);
router.get(
  "/en_marital_statuses",
  passEnValueToController,
  getMaritalStatusesController
);
export default router;
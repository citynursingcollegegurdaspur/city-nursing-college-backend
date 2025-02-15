import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as supplyController from "./supply.controller";
import * as supplyValidator from "./supply.validation";

const router = Router();

router
  .get("/", supplyController.getAllSupply)
  .get("/total",supplyValidator.totalSupply,catchError, supplyController.getSupplyCountOfStudentSubject)
  .get("/:id", supplyController.getSupplyById)
  // .delete("/:id", supplyController.deleteSupply)
  .post(
    "/",
    supplyValidator.createSupply,
    catchError,
    supplyController.createSupply,
  )

export default router;

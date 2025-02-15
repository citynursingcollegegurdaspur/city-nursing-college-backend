import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as studentFeeController from "./student-fee.controller";
import * as studentFeeValidator from "./student-fee.validation";

const router = Router();

router
  .get("/", studentFeeController.getAllStudentFee)
  .get(
    "/latest",
    studentFeeValidator.getStudentFee,
    studentFeeController.getLatestStudentFee,
  )
  .get("/:id", studentFeeController.getStudentFeeById)
  .delete("/:id", studentFeeController.deleteStudentFee)
  .post(
    "/",
    studentFeeValidator.createStudentFee,
    catchError,
    studentFeeController.createStudentFee,
  );

export default router;

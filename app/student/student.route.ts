import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as studentController from "./student.controller";
import * as studentValidator from "./student.validation";
import { getDocument } from "../common/validation/common.validation";

const router = Router();

router
  .get("/", studentController.getAllStudent)
  .get("/:id", studentController.getStudentByRegisterNumber)
  .delete("/:id", getDocument, catchError, studentController.deleteStudent)
  .post(
    "/",
    studentValidator.createStudent,
    catchError,
    studentController.createStudent,
  )
  .put(
    "/:id",
    getDocument,
    studentValidator.updateStudent,
    catchError,
    studentController.updateStudent,
  )
  .patch(
    "/:id",
    getDocument,
    studentValidator.editStudent,
    catchError,
    studentController.editStudent,
  );

export default router;

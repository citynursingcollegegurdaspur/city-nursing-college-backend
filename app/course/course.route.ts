import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as courseController from "./course.controller";
import * as courseValidator from "./course.validation";

const router = Router();

router
  .get(
    "/",
    courseValidator.getAllCourse,
    catchError,
    courseController.getAllCourse,
  )
  .get("/:id", courseController.getCourseById)
  .delete("/:id", courseController.deleteCourse)
  .post(
    "/",
    courseValidator.createCourse,
    catchError,
    courseController.createCourse,
  )
  .put(
    "/:id",
    courseValidator.updateCourse,
    catchError,
    courseController.updateCourse,
  )
  .patch(
    "/:id",
    courseValidator.editCourse,
    catchError,
    courseController.editCourse,
  );

export default router;

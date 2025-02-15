import { body, check, param } from "express-validator";
import * as courseService from "../course/course.service";
import { CourseStatus } from "./course.dto";

// Reusable validation functions
const validateName = (isRequired = true, applyCustomValidation = true) => {
  const validator = body("name")
    .if(() => isRequired)
    .notEmpty()
    .withMessage("Course name is required")
    .isString()
    .withMessage("Course name must be a string");

  if (applyCustomValidation) {
    validator.custom(async (value) => {
      const isCourseExists = await courseService.getCourseByName(value);
      if (isCourseExists.length) {
        throw new Error("Course already exists");
      }
    });
  }

  return validator;
};

const validateDescription = (isRequired = false) =>
  body("description")
    .if(() => isRequired)
    .optional()
    .isString()
    .withMessage("Description must be a string");

const validateDuration = (isRequired = true) =>
  body("duration")
    .if(() => isRequired)
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ gt: 0 })
    .withMessage("Duration must be a positive integer");

// Validators
export const getAllCourse = [
  param("status")
    .optional()
    .isString()
    .withMessage("Status name must be a string")
    .isIn(Object.keys(CourseStatus))
    .withMessage(
      `Status must be one of the following: ${Object.values(CourseStatus).join(", ")}`,
    ),
  check("IsPopulateSemsters")
    .optional()
    .isString()
    .withMessage("Status name must be a string")
    .isIn(["0", "1"])
    .withMessage(`Status must be either 0 or 1`),
];

export const createCourse = [
  validateName(true, true),
  validateDescription(false),
  validateDuration(),
];

export const updateCourse = [
  validateName(true, false), // Custom validation excluded
  validateDescription(false),
  validateDuration(true),
];

export const editCourse = [
  validateName(false, false), // Custom validation excluded
  validateDescription(false),
  validateDuration(false),
];

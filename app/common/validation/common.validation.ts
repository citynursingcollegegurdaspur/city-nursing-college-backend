import { check, param } from "express-validator";

export const getDocuments = [
  check("page").optional().isNumeric().withMessage("Page must be a number"),
  check("limit").optional().isNumeric().withMessage("Limit must be a number"),
];
export const getDocument = [
  param("id").exists().isMongoId().withMessage("Id must be a number"),
];

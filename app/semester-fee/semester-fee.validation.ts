import { body, check } from "express-validator";
import { Caste } from "./semester-fee.dto";

const validateFees = () =>
  body("fees")
    .isArray({ min: 1 })
    .withMessage("Fees must be a non-empty array")
    .custom((fees) => {
      fees.forEach((fee: any, feeIndex: number) => {
        // Validate type field
        if (!fee.type || typeof fee.type !== "string") {
          throw new Error(
            `Fee at index ${feeIndex} must have a valid 'type' field`,
          );
        }

        // Validate details array
        if (!Array.isArray(fee.details) || fee.details.length === 0) {
          throw new Error(
            `Fee at index ${feeIndex} must have a non-empty 'details' array`,
          );
        }

        const casteSet = new Set();
        fee.details.forEach((detail: any, detailIndex: number) => {
          // Validate caste field
          if (!detail.caste || !Object.values(Caste).includes(detail.caste)) {
            throw new Error(
              `Invalid or missing 'caste' in fee details at index ${detailIndex} for fee at index ${feeIndex}`,
            );
          }

          // Check for duplicate caste entries
          if (casteSet.has(detail.caste)) {
            throw new Error(
              `Duplicate 'caste' value found in fee details at index ${detailIndex} for fee at index ${feeIndex}: ${detail.caste}`,
            );
          }
          casteSet.add(detail.caste);

          // Validate amount field
          if (
            !detail.amount ||
            typeof detail.amount !== "number" ||
            detail.amount < 0
          ) {
            throw new Error(
              `Invalid or missing 'amount' in fee details at index ${detailIndex} for fee at index ${feeIndex}`,
            );
          }
        });
      });

      return true;
    });

export const createsemesterFee = [
  // Validate course
  body("course")
    .exists()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("CourseId must be a valid MongoDB ID"),
  // Validate semesterNumber
  body("semesterNumber")
    .isInt({ min: 1 })
    .withMessage(
      "Semester number must be an integer greater than or equal to 1",
    ),
  // Validate fees array
  validateFees(),
];

export const updatesemesterFee = [
  // Validate course
  body("course")
    .exists()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("CourseId must be a valid MongoDB ID"),
  // Validate semesterNumber
  body("semesterNumber")
    .isInt({ min: 1 })
    .withMessage(
      "Semester number must be an integer greater than or equal to 1",
    ),
  // Validate fees array
  validateFees(),
];

export const editsemesterFee = [
  // Validate course
  body("course")
    .optional()
    .isMongoId()
    .withMessage("CourseId must be a valid MongoDB ID"),
  // Validate semesterNumber
  body("semesterNumber")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Semester number must be an integer greater than or equal to 1",
    ),
  // Validate fees array
  validateFees().optional(),
];

export const getAllsemesterFee = [
  check("course")
    .optional()
    .isMongoId()
    .withMessage("Course must be a valid MongoDB ID"),
];

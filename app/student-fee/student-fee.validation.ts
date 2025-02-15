import { body, check } from "express-validator";
import { PaymentMode } from "./student-fee.dto";
import * as studentService from "../student/student.service";
import * as semesterFeeService from "../semester-fee/semester-fee.service";
export const createStudentFee = [
  body("student")
    .exists()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Student ID must be a valid MongoDB ID")
    .custom(async (value) => {
      const isStudentExists = await studentService.getStudentById(value);
      if (!isStudentExists) {
        throw new Error("Student does not exist");
      }
    }),

  body("semester")
    .exists()
    .withMessage("Semester ID is required")
    .isMongoId()
    .withMessage("Semester ID must be a valid MongoDB ID"),

  body("paidAmount")
    .exists()
    .withMessage("Paid amount is required")
    .isNumeric()
    .withMessage("Paid amount must be a number"),

  body("modeOfPayment")
    .exists()
    .withMessage("Mode of payment is required")
    .isIn(Object.values(PaymentMode))
    .withMessage(
      `Mode of payment must be one of the following: ${Object.values(PaymentMode).join(", ")}`,
    ),

  body("payDate")
    .exists()
    .withMessage("Pay date is required")
    .isISO8601()
    .withMessage("Pay date must be a valid ISO 8601 date"),

  body("transactionId")
    .optional()
    .isString()
    .withMessage("Transaction ID must be a string"),
  body("remark").optional().isString().withMessage("Remark must be a string"),
];

export const getStudentFee = [
  check("student")
    .exists()
    .withMessage("Student ID is required")
    .isString()
    .withMessage("Student ID must be a valid registration number")
    .custom(async (value) => {
      const isStudentExists =
        await studentService.getStudentByRegistrationNumber(value);
      if (!isStudentExists) {
        throw new Error("Student does not exist");
      }
    }),

  check("semester")
    .exists()
    .withMessage("Semester ID is required")
    .isMongoId()
    .withMessage("Semester ID must be a valid MongoDB ID"),
];

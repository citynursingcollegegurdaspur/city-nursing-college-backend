import { body, query } from "express-validator";
import { PaymentMode } from "../student-fee/student-fee.dto";

export const createSupply = [
    body("student")
        .notEmpty()
        .withMessage("Student is required")
        .isMongoId()
        .withMessage("Student must be a valid MongoId"),
    body("semester")
        .notEmpty()
        .withMessage("Semester is required")
        .isMongoId()
        .withMessage("Semester must be a valid MongoId"),
    body("subject")
        .notEmpty()
        .withMessage("Subject is required")
        .isString()
        .withMessage("Subject must be a string"),
    body("supplyNumber")
        .notEmpty()
        .withMessage("Supply Number is required")
        .isNumeric()
        .withMessage("Supply Number must be a number"),
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

export const totalSupply = [
    query("student")
        .notEmpty()
        .withMessage("Student is required")
        .isMongoId()
        .withMessage("Student must be a valid MongoId"),
    query("semester")
        .notEmpty()
        .withMessage("Semester is required")
        .isMongoId()
        .withMessage("Semester must be a valid MongoId"),
    query("subject")
        .notEmpty()
        .withMessage("Subject is required")
        .isString()
        .withMessage("Subject must be a string"),
];
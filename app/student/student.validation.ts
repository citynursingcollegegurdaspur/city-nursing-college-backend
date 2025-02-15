import { body } from "express-validator";
import * as courseService from "../course/course.service";
import * as studentService from "./student.service";
import { Caste } from "../semester-fee/semester-fee.dto";

export const createStudent = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("motherName")
    .notEmpty()
    .withMessage("Mother Name is required")
    .isString()
    .withMessage("Mother Name must be a string"),
  body("fatherName")
    .notEmpty()
    .withMessage("Father Name is required")
    .isString()
    .withMessage("Father Name must be a string"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(Object.values(Caste))
    .withMessage(`Category must be in ${Object.values(Caste).join(", ")}`),
  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration Number is required")
    .isString()
    .withMessage("Registration Number must be a string")
    .custom(async (value) => {
      const student =
        await studentService.getAnyStudentByRegistrationNumber(value);
      if (student) {
        throw new Error(
          `Student with ${value} registration number already exists`,
        );
      }
    }),
  body("course")
    .notEmpty()
    .withMessage("Course is required")
    .isMongoId()
    .withMessage("Course must be a valid mongodb Id")
    .custom(async (value) => {
      const course = await courseService.getCourseById(value);
      if (!course) {
        throw new Error("Course not found");
      }
    }),
  body("aadharNo")
    .notEmpty()
    .withMessage("Aadhar Number is required")
    .isString()
    .withMessage("Aadhar Number must be a valid")
    .matches(/^\d{12}$/)
    .withMessage("Aadhaar number must be exactly 12 digits")
    .custom(async (value) => {
      const student = await studentService.getStudentByAadharNumber(value);
      if (student) {
        throw new Error(`Student with ${value} aadhar number already exists`);
      }
    }),
  body("contactNo")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("en-IN")
    .withMessage("Phone must be a valid phone number"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
  body("registrationDate")
    .notEmpty()
    .withMessage("Registration Date is required")
    .isISO8601()
    .withMessage("Registration Date must be a valid date"),
  body("session")
    .notEmpty()
    .withMessage("Session is required")
    .isNumeric()
    .withMessage("Session must be a valid number"),
  body("feesDiscount")
    .notEmpty()
    .withMessage("Fees Discount is required")
    .isNumeric()
    .withMessage("Fees Discount must be a valid number"),
];

export const updateStudent = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("motherName")
    .notEmpty()
    .withMessage("Mother Name is required")
    .isString()
    .withMessage("Mother Name must be a string"),
  body("fatherName")
    .notEmpty()
    .withMessage("Father Name is required")
    .isString()
    .withMessage("Father Name must be a string"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(Object.values(Caste))
    .withMessage(`Category must be in ${Object.values(Caste).join(", ")}`),
  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration Number is required")
    .isString()
    .withMessage("Registration Number must be a string"),
  body("course")
    .notEmpty()
    .withMessage("Course is required")
    .isMongoId()
    .withMessage("Course must be a valid mongodb Id"),
  body("aadharNo")
    .notEmpty()
    .withMessage("Aadhar Number is required")
    .isString()
    .withMessage("Aadhar Number must be a valid")
    .matches(/^\d{12}$/)
    .withMessage("Aadhaar number must be exactly 12 digits"),
  body("contactNo")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("en-IN")
    .withMessage("Phone must be a valid phone number"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
  body("registrationDate")
    .notEmpty()
    .withMessage("Registration Date is required")
    .isISO8601()
    .withMessage("Registration Date must be a valid date"),
  body("session")
    .notEmpty()
    .withMessage("Session is required")
    .isNumeric()
    .withMessage("Session must be a valid number"),
  body("feesDiscount")
    .notEmpty()
    .withMessage("Fees Discount is required")
    .isNumeric()
    .withMessage("Fees Discount must be a valid number"),
];

export const editStudent = [
  body("name").optional().isString().withMessage("Name must be a string"),

  body("motherName")
    .optional()
    .isString()
    .withMessage("Mother Name must be a string"),
  body("fatherName")
    .optional()
    .isString()
    .withMessage("Father Name must be a string"),
  body("category")
    .optional()
    .isIn(Object.values(Caste))
    .withMessage(`Category must be in ${Object.values(Caste).join(", ")}`),
  body("registrationNumber")
    .optional()
    .isString()
    .withMessage("Registration Number must be a string"),
  body("course")
    .optional()
    .isMongoId()
    .withMessage("Course must be a valid mongodb Id"),
  body("aadharNo")
    .optional()
    .isString()
    .withMessage("Aadhar Number must be a valid")
    .matches(/^\d{12}$/)
    .withMessage("Aadhaar number must be exactly 12 digits"),
  body("contactNo")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Phone must be a valid phone number"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("dob")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
  body("registrationDate")
    .optional()
    .isISO8601()
    .withMessage("Registration Date must be a valid date"),
  body("session")
    .optional()
    .isNumeric()
    .withMessage("Session must be a valid number"),
  body("feesDiscount")
    .optional()
    .isNumeric()
    .withMessage("Fees Discount must be a valid number"),
];

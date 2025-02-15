import { body, check } from "express-validator";

export const password = check("password")
  .notEmpty()
  .withMessage("Password is required")
  .isString()
  .withMessage("Password must be a string")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must include at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must include at least one lowercase letter")
  .matches(/\d/)
  .withMessage("Password must include at least one number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage("Password must include at least one special character");
export const createUser = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("userName")
    .notEmpty()
    .withMessage("userName is required")
    .isString()
    .withMessage("userName must be a string"),
  body("active").isBoolean().withMessage("active must be a boolean"),
  password,
];

export const updateUser = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("userName")
    .notEmpty()
    .withMessage("userName is required")
    .isString()
    .withMessage("userName must be a string"),
  body("active").isBoolean().withMessage("active must be a boolean"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
];

export const editUser = [
  body("name").isString().withMessage("name must be a string"),
  body("userName").isString().withMessage("userName must be a string"),
  body("active").isBoolean().withMessage("active must be a boolean"),
  body("password").isString().withMessage("password must be a string"),
];

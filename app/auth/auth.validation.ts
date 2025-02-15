import { body } from "express-validator";
import { password } from "../user/user.validation";

export const createAuth = [];

export const updateAuth = [];

export const editAuth = [];

export const resetPassword = [
  password,
  body("confirmPassword")
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
    .withMessage("Password must include at least one special character")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

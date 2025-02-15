import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authController from "./auth.controller";
import * as authValidator from "./auth.validation";
import passport from "passport";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { UserType } from "../user/user.dto";

const router = Router();

router
  .post(
    "/login",
    passport.authenticate("login", { session: false }),
    authController.loginAuth,
  )
  .post(
    "/reset-password",
    roleAuth(UserType.ADMIN),
    authValidator.resetPassword,
    catchError,
    authController.resetPasswordAuth,
  );

export default router;

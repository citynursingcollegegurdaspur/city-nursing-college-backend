import * as authService from "./auth.service";
import * as userService from "../user/user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import {
  createUserTokens,
  isValidPassword,
} from "../common/services/passport-jwt.service";
import { getLoginUser } from "../common/helper/util.helper";
import { hashPassword } from "../user/user.schema";

export const loginAuth = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Invalid credentials");
  }
  res.send(
    createResponse(
      { ...createUserTokens(req.user) },
      "Auth created sucssefully",
    ),
  );
});

export const resetPasswordAuth = asyncHandler(
  async (req: Request, res: Response) => {
    const user = getLoginUser(req.user);
    const { confirmPassword } = req.body;
    const hashedPassword = await hashPassword(confirmPassword);
    const result = await userService.updateUser(user._id, {
      password: hashedPassword,
    });
    res.send(createResponse(result));
  },
);

export const updateAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.updateAuth(req.params.id, req.body);
  res.send(createResponse(result, "Auth updated sucssefully"));
});

export const editAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.editAuth(req.params.id, req.body);
  res.send(createResponse(result, "Auth updated sucssefully"));
});

export const deleteAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.deleteAuth(req.params.id);
  res.send(createResponse(result, "Auth deleted sucssefully"));
});

export const getAuthById = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.getAuthById(req.params.id);
  res.send(createResponse(result));
});

export const getAllAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.getAllAuth();
  res.send(createResponse(result));
});

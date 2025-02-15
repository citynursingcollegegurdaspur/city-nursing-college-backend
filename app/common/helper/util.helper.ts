import { Request } from "express";
import createHttpError from "http-errors";

export const getLoginUser = (user?: Request["user"]) => {
  if (!user) {
    throw createHttpError(400, {
      message: "User not found",
    });
  }
  return user;
};

export const getPaginationOptions = (query: Request["query"]) => {
  const page = parseInt((query?.page ?? 1) as string);
  const limit = parseInt((query?.limit ?? 10) as string);
  const sort = query?.sort
    ? (query?.sort as string) === "asc"
      ? { createdAt: -1 }
      : { createdAt: 1 }
    : { createdAt: -1 };
  return { page, limit, sort };
};

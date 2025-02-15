import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import * as dashboardService from "./dashboard.service";
export const getDashboardCards = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await dashboardService.getDashboardCards();
    res.send(
      createResponse(result, "Dashboard cards data fetched sucssefully"),
    );
  },
);

export const getDashboardGraph = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await dashboardService.getDashboardGraph();
    res.send(
      createResponse(result, "Dashboard graphs data fetched sucssefully"),
    );
  },
);

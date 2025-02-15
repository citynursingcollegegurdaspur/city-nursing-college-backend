import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as dashboardController from "./dashboard.controller";

const router = Router();

router
  .get("/cards", dashboardController.getDashboardCards)
  .get("/graph", dashboardController.getDashboardGraph);

export default router;

import express from "express";
import authRoutes from "./auth/auth.route";
import courseRoutes from "./course/course.route";
import courseSemsterRoutes from "./semester-fee/semester-fee.route";
import studentRoutes from "./student/student.route";
import feesRoutes from "./student-fee/student-fee.route";
import dashboardRoutes from "./dashboard/dashboard.route";
import supplyRoutes from "./supply/supply.route";
import { roleAuth } from "./common/middleware/role-auth.middleware";
import { UserType } from "./user/user.dto";
// routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/dashboard", roleAuth(UserType.ADMIN), dashboardRoutes);
router.use("/course", roleAuth(UserType.ADMIN), courseRoutes);
router.use("/semester", roleAuth(UserType.ADMIN), courseSemsterRoutes);
router.use("/student", roleAuth(UserType.ADMIN), studentRoutes);
router.use("/fees", roleAuth(UserType.ADMIN), feesRoutes);
router.use("/supply", roleAuth(UserType.ADMIN), supplyRoutes);
export default router;

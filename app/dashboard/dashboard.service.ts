import * as courseService from "../course/course.service";
import * as studentService from "../student/student.service";
import * as studentFeeService from "../student-fee/student-fee.service";
import moment from "moment";
export const getDashboardCards = async () => {
  const totalCourses = await courseService.getAllCourseCount();
  const totalStudents = await studentService.getAllStudentCount();
  const totalStudentsCategoryWise =
    await studentService.getStudentCountsCategoryWise();
  const currentMonthStudentFeesAmount =
    await studentFeeService.getCurrentMonthStudentFeesCount();
  const currentMonthStudentBalanceFeesAmount =
    await studentFeeService.getCurrentMonthStudentBalanceFeesCount();
  return {
    coursesCount: totalCourses,
    studentsCount: totalStudents,
    categoryWiseStudentsCount: totalStudentsCategoryWise,
    currentMonthFees: currentMonthStudentFeesAmount,
    currentMonthBalanceFees: currentMonthStudentBalanceFeesAmount,
  };
};

export const getDashboardGraph = async () => {
  // Check if data for the current month exists
  const monthlyData = await studentService.getMonthlyData();
  if (monthlyData.length > 0) {
    return {
      timeframe: "month",
      data: monthlyData,
    };
  }

  // If no monthly data, get yearly data
  const yearlyData = studentService.getYearlyData();

  return {
    timeframe: "year",
    data: yearlyData,
  };
};

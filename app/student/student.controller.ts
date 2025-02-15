import * as studentService from "./student.service";
import * as courseService from "../course/course.service";
import * as feeService from "../student-fee/student-fee.service";
import * as semesterFeeService from "../semester-fee/semester-fee.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { getPaginationOptions } from "../common/helper/util.helper";
import { Types } from "mongoose";
import { PaymentMode } from "../student-fee/student-fee.dto";

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { course: courseId, category, feesDiscount } = req.body;

    // Validate course fees and discount
    const studentCourseFeeAmount = await courseService.getCourseFeesByCategory(
      courseId,
      category,
    );
    if (studentCourseFeeAmount < feesDiscount) {
      throw new Error("Discount amount is greater than course fees");
    }

    // Fetch the course with semesters
    const course = await courseService.getCourseByIdWithSemesters(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const semesterCount = course.semesters.length;
    if (semesterCount === 0) {
      throw new Error("Course does not have any semesters");
    }

    const discountPerSemester = Math.floor(feesDiscount / semesterCount);

    // Validate that each semester's fee is greater than the per-semester discount
    for (const semester of course.semesters) {
      const totalFees =
        semesterFeeService.getTotalSemesterFeesByCasteFromSemester(
          category,
          semester,
        );
      if (discountPerSemester > totalFees) {
        throw new Error(
          `Discount amount (${discountPerSemester}) is greater than semester ${semester.semesterNumber} fees (${totalFees})`,
        );
      }
    }

    // Create the student only after successful validation
    const student = await studentService.createStudent(req.body);

    // Process all semesters concurrently
    await Promise.all(
      course.semesters.map(async (semester, index) => {
        const totalFees =
          semesterFeeService.getTotalSemesterFeesByCasteFromSemester(
            category,
            semester,
          );
        const finalTotalFees = totalFees - discountPerSemester;

        await feeService.createStudentFee({
          student: new Types.ObjectId(student._id),
          semester: new Types.ObjectId(semester._id),
          totalFees: finalTotalFees,
          totalDiscount: discountPerSemester,
          paidAmount: 0,
          balanceFees: finalTotalFees,
          modeOfPayment: PaymentMode.CASH,
          payDate: new Date(),
        });
      }),
    );

    res.send(createResponse(student, "Student created successfully"));
  },
);

export const updateStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.updateStudent(req.params.id, req.body);
    res.send(createResponse(result, "Student updated sucssefully"));
  },
);

export const editStudent = asyncHandler(async (req: Request, res: Response) => {
  const result = await studentService.editStudent(req.params.id, req.body);
  res.send(createResponse(result, "Student updated sucssefully"));
});

export const deleteStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.deleteStudent(req.params.id);
    res.send(createResponse(result, "Student deleted sucssefully"));
  },
);

export const getStudentById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.getStudentById(req.params.id);
    res.send(createResponse(result));
  },
);
export const getStudentByRegisterNumber = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await studentService.getStudentByRegistrationNumber(
      req.params.id,
    );
    res.send(createResponse(result));
  },
);

export const getAllStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = getPaginationOptions(req.query);
    const studentRegistrationNumber = req.query?.studentRegistrationNumber ? req.query!.studentRegistrationNumber.toString() : undefined;
    const result = await studentService.getAllStudent(paginationOptions, {studentRegistrationNumber});
    res.send(createResponse(result));
  },
);

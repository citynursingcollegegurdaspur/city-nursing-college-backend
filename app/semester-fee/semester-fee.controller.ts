import * as semesterFeeService from "./semester-fee.service";
import * as courseService from "../course/course.service";
import * as studentService from "../student/student.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { CourseStatus } from "../course/course.dto";
import { Types } from "mongoose";

export const validateSemesterFeeRequestOperation = async (req: Request) => {
  const { id: semesterId } = req.params;
  const existingSemester = semesterId
    ? await semesterFeeService.getsemesterFeeById(semesterId)
    : null;
  if (!existingSemester) {
    throw new Error("Semester fee not found");
  }

  const enrolledStudentsCount = await studentService.getCourseStudentCount(
    existingSemester.course.toString(),
  );
  if (enrolledStudentsCount > 0) {
    throw new Error("This semester Course have enrolled students");
  }
  return existingSemester;
};

export const createsemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate the request
    const { course: courseId, semesterNumber } = req.body;
    const course = await courseService.getCourseByIdWithSemesters(
      courseId as string,
    );
    if (!course) {
      throw new Error("Associated course not found");
    }

    if (course.duration < semesterNumber) {
      throw new Error(
        `Semester number ${semesterNumber} exceeds the course duration of ${course.duration}`,
      );
    }
    const isSemesterExists = course.semesters.some(
      (semester) => semester.semesterNumber === semesterNumber,
    );
    if (isSemesterExists) {
      throw new Error(
        `Semester ${semesterNumber} already exists for course ${course.name}`,
      );
    }
    // Create the new semester fee
    const newSemesterFee = await semesterFeeService.createsemesterFee(req.body);

    // Update the course with the new semesters list
    course.semesters.push(newSemesterFee);
    const updatedCourse = await courseService.editCourse(course._id, {
      semesters: course.semesters.map(
        (semester) => new Types.ObjectId(semester._id),
      ),
    });
    if (!updatedCourse) {
      throw new Error("Failed to update course");
    }
    // Check and update course status if needed
    if (updatedCourse.semesters.length === course.duration) {
      await courseService.editCourse(course._id, {
        status: CourseStatus.COMPLETED,
      });
    }

    res.send(
      createResponse(newSemesterFee, "Semester fee created successfully"),
    );
  },
);

export const updatesemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const isValidOperation = await validateSemesterFeeRequestOperation(req);
    if (!isValidOperation) {
      throw new Error("Cannot update semester fee");
    }

    const result = await semesterFeeService.updatesemesterFee(
      req.params.id,
      req.body,
    );

    res.send(createResponse(result, "Semester fee updated successfully"));
  },
);

export const editsemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const isValidOperation = await validateSemesterFeeRequestOperation(req);
    if (!isValidOperation) {
      throw new Error("Cannot edit semester fee");
    }

    // Perform the edit
    const result = await semesterFeeService.editsemesterFee(
      req.params.id,
      req.body,
    );

    res.send(createResponse(result, "Semester fee updated successfully"));
  },
);

export const deletesemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const isValidOperation = await validateSemesterFeeRequestOperation(req);
    if (!isValidOperation) {
      throw new Error("Cannot delete semester fee");
    }

    const result = await semesterFeeService.deletesemesterFee(req.params.id);
    await courseService.removeCourseSemester(
      isValidOperation.course.toString(),
      isValidOperation._id,
    );
    res.send(createResponse(result, "semesterFee deleted sucssefully"));
  },
);

export const getsemesterFeeById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await semesterFeeService.getsemesterFeeById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllsemesterFee = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = req.query.course as string;
    const result = await semesterFeeService.getAllsemesterFee(courseId);
    res.send(createResponse(result));
  },
);

import * as courseService from "./course.service";
import * as studentService from "../student/student.service";
import * as semesterService from "../semester-fee/semester-fee.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { CourseStatus } from "./course.dto";

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await courseService.createCourse(req.body);
    res.send(createResponse(result, "Course created sucssefully"));
  },
);

export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const enrolledStudentsCount = await studentService.getCourseStudentCount(
      req.params.id,
    );
    if (enrolledStudentsCount > 0) {
      throw new Error("This semester Course have enrolled students");
    }
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      throw new Error("Course not found");
    }
    const updateBody = req.body;
    if (updateBody.duration != course.semesters.length) {
      updateBody.status = CourseStatus.PENDING;
    } else {
      updateBody.status = CourseStatus.COMPLETED;
    }
    const result = await courseService.updateCourse(req.params.id, updateBody);
    res.send(createResponse(result, "Course updated sucssefully"));
  },
);

export const editCourse = asyncHandler(async (req: Request, res: Response) => {
  const enrolledStudentsCount = await studentService.getCourseStudentCount(
    req.params.id,
  );
  if (enrolledStudentsCount > 0) {
    throw new Error("This semester Course have enrolled students");
  }
  const course = await courseService.getCourseById(req.params.id);
  if (!course) {
    throw new Error("Course not found");
  }
  const editBody = req.body;
  if (editBody.duration) {
    if (editBody.duration != course.semesters.length) {
      editBody.status = CourseStatus.PENDING;
    } else {
      editBody.status = CourseStatus.COMPLETED;
    }
  }

  const result = await courseService.editCourse(req.params.id, editBody);
  res.send(createResponse(result, "Course updated sucssefully"));
});

export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const enrolledStudentsCount = await studentService.getCourseStudentCount(
      req.params.id,
    );
    if (enrolledStudentsCount > 0) {
      throw new Error("Cannot delete course with enrolled students");
    }
    const result = await courseService.deleteCourse(req.params.id);
    await semesterService.deleteAllCourseSemesters(req.params.id);
    res.send(createResponse(result, "Course deleted sucssefully"));
  },
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await courseService.getCourseByIdWithSemesters(
      req.params.id,
    );
    res.send(createResponse(result));
  },
);

export const getAllCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const status = req.query.status as CourseStatus;
    const isPopulateSemsters = Boolean(
      parseInt(req.query.isPopulateSemsters as string),
    );
    const result = await courseService.getAllCourse(status, isPopulateSemsters);
    res.send(createResponse(result));
  },
);

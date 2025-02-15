import { CourseStatus, type ICourse } from "./course.dto";
import { IsemesterFee } from "../semester-fee/semester-fee.dto";
import CourseSchema from "./course.schema";
import * as studentService from "../student/student.service";
import { Types } from "mongoose";

export const createCourse = async (data: ICourse) => {
  const result = await CourseSchema.create({ ...data, active: true });
  return result;
};

export const updateCourse = async (id: string, data: ICourse) => {
  const result = await CourseSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editCourse = async (id: string, data: Partial<ICourse>) => {
  const result = await CourseSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const deleteCourse = async (id: string) => {
  const result = await CourseSchema.deleteOne({ _id: id });
  return result;
};

export const getCourseById = async (id: string) => {
  const result = await CourseSchema.findById(id).lean();
  return result;
};

export const getCourseByIdWithSemesters = async (id: string) => {
  const result = await CourseSchema.findById(id)
    .populate<{ semesters: IsemesterFee[] }>("semesters")
    .lean();
  return result;
};

export const getAllCourse = async (
  status?: CourseStatus,
  isPopulateSemsters?: boolean,
) => {
  const query: Record<string, string> = {};

  if (status) {
    query.status = status;
  }

  let queryBuilder = CourseSchema.find(query).sort({ createdAt: -1 });

  if (isPopulateSemsters) {
    queryBuilder = queryBuilder.populate("semesters");
  }

  const result = await queryBuilder;
  return result;
};

export const getAllCourseWithSemesters = async (status?: CourseStatus) => {
  const query: Record<string, string> = {};

  if (status) {
    query.status = status;
  }

  const result = await CourseSchema.find(query)
    .populate<{ semesters: IsemesterFee[] }>("semesters")
    .sort({ createdAt: -1 });
  return result;
};

export const getCourseByName = async (name: string) => {
  return await CourseSchema.find({ name }).lean();
};

export const getCourseFeesByCategory = async (
  courseId: string,
  studentCategory: string,
) => {
  // Use aggregation to calculate the total fees for the student's category
  const result = await CourseSchema.aggregate([
    { $match: { _id: new Types.ObjectId(courseId) } }, // Match the course by ID
    {
      $lookup: {
        from: "semesterfees", // Collection name for semester fees
        localField: "semesters",
        foreignField: "_id",
        as: "semesters",
      },
    },
    { $unwind: "$semesters" }, // Flatten the semesters array
    { $unwind: "$semesters.fees" }, // Flatten the fees array within each semester
    { $unwind: "$semesters.fees.details" }, // Flatten the details array within each fee
    {
      $match: {
        "semesters.fees.details.caste": studentCategory, // Match details with the student's category
      },
    },
    {
      $group: {
        _id: null, // Group all matching entries
        totalCost: { $sum: "$semesters.fees.details.amount" }, // Sum the amounts for the category
      },
    },
  ]);

  // Extract the totalCost from the aggregation result
  const totalCost = result.length > 0 ? result[0].totalCost : 0;

  return totalCost;
};

export const getAllCourseCount = async () => {
  const result = await CourseSchema.count({});
  return result;
};

export const removeCourseSemester = async (
  courseId: string,
  semesterId: string,
) => {
  return await CourseSchema.findByIdAndUpdate(
    courseId,
    { $pull: { semesters: semesterId }, status: CourseStatus.PENDING },
    { new: true },
  );
};

import { ICourse } from "../course/course.dto";
import { Caste, IsemesterFee } from "../semester-fee/semester-fee.dto";
import { type IStudent } from "./student.dto";
import StudentSchema from "./student.schema";
import moment from "moment";

export const createStudent = async (data: IStudent) => {
  const result = await StudentSchema.create({ ...data, active: true });
  return result;
};

export const updateStudent = async (id: string, data: IStudent) => {
  const result = await StudentSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editStudent = async (id: string, data: Partial<IStudent>) => {
  const result = await StudentSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteStudent = async (id: string) => {
  const result = await StudentSchema.updateOne(
    { _id: id },
    { isDeleted: true }
  );
  return result;
};

export const getStudentById = async (id: string) => {
  const result = await StudentSchema.findOne({
    _id: id,
    isDeleted: false,
  }).lean();
  return result;
};

export const getStudentByIdWithCourseAndItsSemesters = async (id: string) => {
  const result = await StudentSchema.findOne({ _id: id, isDeleted: false })
    .populate<{
      course: Omit<ICourse, "semesters"> & { semesters: IsemesterFee[] };
    }>({
      path: "course",
      model: "course",
      populate: {
        path: "semesters",
        model: "SemesterFee",
      },
    })
    .lean();
  return result;
};

export const getStudentByRegistrationNumber = async (
  registrationNumber: string
) => {
  const result = await StudentSchema.findOne({
    registrationNumber,
    isDeleted: false,
  })
    .populate<{
      course: Omit<ICourse, "semesters"> & { semesters: IsemesterFee[] };
    }>({
      path: "course",
      model: "course",
      populate: {
        path: "semesters",
        model: "SemesterFee",
      },
    })
    .lean();
  return result;
};
export const getAnyStudentByRegistrationNumber = async (
  registrationNumber: string
) => {
  const result = await StudentSchema.findOne({ registrationNumber }).lean();
  return result;
};
export const getStudentByAadharNumber = async (aadharNumber: string) => {
  const result = await StudentSchema.findOne({
    aadharNo: aadharNumber,
    isDeleted: false,
  }).lean();
  return result;
};

export const getAllStudent = async (
  options: Record<string, any>,
  conditions: Record<string, any>
) => {
  const query: Record<string, any> = { isDeleted: false };
  const { studentRegistrationNumber } = conditions;
  if (studentRegistrationNumber) {
    query.registrationNumber = studentRegistrationNumber;
  }
  const result = await StudentSchema.paginate(query, {
    ...options,
    populate: {
      path: "course",
      model: "course",
      populate: {
        path: "semesters",
        model: "SemesterFee",
      },
    },
  });
  return result;
};

export const getAllStudentCount = async () => {
  const result = await StudentSchema.count({ isDeleted: false });
  return result;
};

export const getStudentCountsCategoryWise = async () => {
  const result = await StudentSchema.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        sc: { $sum: { $cond: [{ $eq: ["$category", Caste.SC] }, 1, 0] } },
        general: {
          $sum: { $cond: [{ $eq: ["$category", Caste.GENERAL] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        sc: 1,
        general: 1,
      },
    },
  ]);

  return result.length > 0 ? result[0] : { sc: 0, general: 0 };
};

export const getCourseStudentCount = async (courseId: string) => {
  const result = await StudentSchema.count({
    course: courseId,
    isDeleted: false,
  });
  return result;
};

export const getYearlyData = async () => {
  const startOfYear = moment().startOf("year").toDate();
  const endOfYear = moment().endOf("year").toDate();
  return await StudentSchema.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        studentCount: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by month
    },
    {
      $project: {
        name: { $concat: [{ $toString: "$_id" }, " Month"] }, // Format for chart
        studentCount: 1,
        _id: 0,
      },
    },
  ]);
};

export const getMonthlyData = async () => {
  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();
  return await StudentSchema.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        studentCount: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by day of the month
    },
    {
      $project: {
        name: { $concat: ["Day ", { $toString: "$_id" }] }, // Format for chart
        studentCount: 1,
        _id: 0,
      },
    },
  ]);
};

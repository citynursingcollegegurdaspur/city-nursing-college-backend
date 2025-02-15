import mongoose, { Document, PaginateModel, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { CourseStatus, ICourse } from "./course.dto";

const Schema = mongoose.Schema;

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    duration: { type: Number, required: true },
    semesters: {
      type: [Schema.Types.ObjectId],
      ref: "SemesterFee",
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.PENDING,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICourse>("course", CourseSchema);

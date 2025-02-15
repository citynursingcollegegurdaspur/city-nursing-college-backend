import mongoose, { Schema, Document, Model } from "mongoose";
import { Caste, IsemesterFee } from "./semester-fee.dto";

const FeeDetailSchema = new Schema(
  {
    caste: {
      type: String,
      enum: Object.values(Caste),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const FeeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    details: {
      type: [FeeDetailSchema],
      required: true,
    },
  },
  { _id: false },
);

const SemesterFeeSchema = new Schema<IsemesterFee>(
  {
    semesterNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    fees: {
      type: [FeeSchema],
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IsemesterFee>("SemesterFee", SemesterFeeSchema);

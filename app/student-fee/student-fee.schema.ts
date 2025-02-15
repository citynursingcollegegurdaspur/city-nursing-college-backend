import mongoose, { AggregatePaginateModel, PaginateModel } from "mongoose";
import { PaymentMode, type IStudentFee } from "./student-fee.dto";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const Schema = mongoose.Schema;

const StudentFeeSchema = new Schema<IStudentFee>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "SemesterFee",
      required: true,
    },
    totalFees: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      required: true,
    },
    balanceFees: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    modeOfPayment: {
      type: String,
      enum: Object.values(PaymentMode),
      required: true,
    },
    payDate: {
      type: Date,
      required: true,
    },
    transactionId: {
      type: String,
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true },
);
StudentFeeSchema.plugin(mongoosePaginate);
StudentFeeSchema.plugin(aggregatePaginate);

interface IStudentFeeModel extends PaginateModel<IStudentFee>, AggregatePaginateModel<IStudentFee> {}

export default mongoose.model<IStudentFee, IStudentFeeModel>("studentFee", StudentFeeSchema);

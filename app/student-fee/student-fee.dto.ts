import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export enum PaymentMode {
  CASH = "CASH",
  CHEQUE = "CHEQUE",
  ONLINE_TRANSFER = "ONLINE_TRANSFER",
}

export interface IStudentFee extends BaseSchema {
  student: Types.ObjectId;
  semester: Types.ObjectId;
  totalFees: number;
  totalDiscount: number;
  balanceFees: number;
  paidAmount: number;
  modeOfPayment: PaymentMode;
  payDate: Date;
  transactionId?: string;
  remark: string;
}

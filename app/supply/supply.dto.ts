import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";
import { PaymentMode } from "../student-fee/student-fee.dto";

export interface ISupply extends BaseSchema {
    student: Types.ObjectId;
    semester: Types.ObjectId;
    subject: string;
      paidAmount: number;
      modeOfPayment: PaymentMode;
      payDate: Date;
      transactionId?: string;
      remark: string;
    supplyNumber: number;
}

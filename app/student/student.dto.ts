import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";
import { Caste } from "../semester-fee/semester-fee.dto";

export interface IStudent extends BaseSchema {
  registrationNumber: string;
  session: number;
  name: string;
  motherName: string;
  fatherName: string;
  course: Types.ObjectId;
  feesDiscount: number;
  dob: Date;
  registrationDate: Date;
  aadharNo: string;
  address: string;
  contactNo: string;
  category: Caste;
  isDeleted: boolean;
}

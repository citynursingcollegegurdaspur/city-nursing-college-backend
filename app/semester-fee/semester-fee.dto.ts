import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export enum Caste {
  GENERAL = "general",
  SC = "sc",
}

export interface FeeDetail {
  caste: Caste;
  amount: number;
}

export interface IFee {
  type: string;
  details: FeeDetail[];
}

export interface IsemesterFee extends BaseSchema {
  semesterNumber: number;
  fees: IFee[];
  course: Types.ObjectId;
}

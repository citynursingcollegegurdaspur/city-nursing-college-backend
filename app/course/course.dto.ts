import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export enum CourseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
export interface ICourse extends BaseSchema {
  name: string;
  description?: string;
  duration: number;
  semesters: Types.ObjectId[];
  status: CourseStatus;
}

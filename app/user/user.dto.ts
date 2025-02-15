import { type BaseSchema } from "../common/dto/base.dto";

export enum UserType {
  ADMIN = "ADMIN",
}
export interface IUser extends BaseSchema {
  name?: string;
  userName: string;
  active?: boolean;
  role: UserType;
  password: string;
}

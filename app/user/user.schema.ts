import mongoose from "mongoose";
import { type IUser, UserType } from "./user.dto";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    userName: { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
    role: {
      type: String,
      required: true,
      enum: UserType,
      default: UserType.ADMIN,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export default mongoose.model<IUser>("user", UserSchema);

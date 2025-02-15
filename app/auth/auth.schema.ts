import mongoose from "mongoose";
import { type IAuth } from "./auth.dto";

const Schema = mongoose.Schema;

const AuthSchema = new Schema<IAuth>({}, { timestamps: true });

export default mongoose.model<IAuth>("auth", AuthSchema);

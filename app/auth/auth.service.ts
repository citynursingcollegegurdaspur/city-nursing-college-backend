import { type IAuth } from "./auth.dto";
import AuthSchema from "./auth.schema";

export const createAuth = async (data: IAuth) => {
  const result = await AuthSchema.create({ ...data, active: true });
  return result;
};

export const updateAuth = async (id: string, data: IAuth) => {
  const result = await AuthSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editAuth = async (id: string, data: Partial<IAuth>) => {
  const result = await AuthSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteAuth = async (id: string) => {
  const result = await AuthSchema.deleteOne({ _id: id });
  return result;
};

export const getAuthById = async (id: string) => {
  const result = await AuthSchema.findById(id).lean();
  return result;
};

export const getAllAuth = async () => {
  const result = await AuthSchema.find({}).lean();
  return result;
};

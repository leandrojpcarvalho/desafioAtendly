import { Creation } from "../utils/types.type";

export interface IUserModel {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserCreation = Creation<IUserModel>;
export type UserLogin = Pick<IUserModel, "email" | "password">;
export type UserResponse = Omit<IUserModel, "password">;

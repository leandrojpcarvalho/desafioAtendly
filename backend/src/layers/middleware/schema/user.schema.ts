import Joi from "joi";
import {
  UserCreation,
  UserLogin,
} from "../../../../../shared/interfaces/User.interface";

export const userSchema = Joi.object<UserCreation, true>({
  email: Joi.string().email().required(),
  name: Joi.string()
    .regex(/^[a-zA-Z ]+$/)
    .required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object<UserLogin, true>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const emailSchema = Joi.object<{ email: string }, true>({
  email: Joi.string().email().required(),
});

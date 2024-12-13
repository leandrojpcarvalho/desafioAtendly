import Joi from "joi";
import { UserCreation } from "../../../../../shared/interfaces/User.interface";

export const userSchema = Joi.object<UserCreation, true>({
  email: Joi.string().email().required(),
  name: Joi.string()
    .regex(/^[a-zA-Z ]+$/)
    .required(),
  password: Joi.string().min(6).required(),
});

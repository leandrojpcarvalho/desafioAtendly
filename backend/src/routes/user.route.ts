import { Router } from "express";
import Routes from "../../../shared/mapping/route";
import UserController from "../layers/controller/User.controller";
import MiddleWare from "../layers/middleware/index.middleware";

const {
  Routes: { getRoute },
} = Routes;

const controller = UserController.getInstance();
const userRouter = Router();
const { protectedMiddleware, validationMiddleware, loginWithToken } =
  MiddleWare;

userRouter
  .get(
    getRoute("profile"),
    protectedMiddleware(),
    controller.getMethod("profile")
  ).
  post(
    getRoute("email"),
    validationMiddleware("user", "emailSchema"),
    controller.getMethod('emailValidation')
  )
  .post(
    getRoute("login"),
    loginWithToken(),
    validationMiddleware("user", "loginSchema"),
    controller.getMethod("login")
  )
  .post(
    getRoute("register"),
    validationMiddleware("user", "userSchema"),
    controller.getMethod("create")
  );

export default userRouter;

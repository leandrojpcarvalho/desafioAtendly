import { Router } from "express";
import Routes from "../../../shared/mapping/route";
import UserController from "../layers/controller/User.controller";
import MiddleWare from "../layers/middleware/index.middleware";

const {
  Routes: { getRoute },
} = Routes;

const controller = UserController.getInstance();
const userRouter = Router();
const { protectedMiddleware, validationMiddleware } = MiddleWare;

userRouter
  .get(
    "/api".concat(getRoute("profile")),
    protectedMiddleware(),
    controller.getMethod("profile")
  )
  .post(
    "/api".concat(getRoute("login")),
    validationMiddleware("user", "loginSchema"),
    controller.getMethod("login")
  )
  .post(
    "/api".concat(getRoute("register")),
    validationMiddleware("user", "userSchema"),
    controller.getMethod("create")
  );

export default userRouter;

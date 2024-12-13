import { Router } from "express";
import Routes from "../../../shared/mapping/route";
import UserController from "../layers/controller/User.controller";
import MiddleWare from "../layers/middleware/index.middleware";

const { ERoutes } = Routes;

const controller = UserController.getInstance();
const userRouter = Router();
const { protectedMiddleware, validationMiddleware } = MiddleWare;

userRouter
  .get(
    "/api".concat(ERoutes.profile),
    protectedMiddleware(),
    controller.getMethod("profile")
  )
  .post(
    "/api".concat(ERoutes.login),
    validationMiddleware("user"),
    controller.getMethod("login")
  )
  .post(
    "/api".concat(ERoutes.register),
    validationMiddleware("user"),
    controller.getMethod("create")
  );

export default userRouter;

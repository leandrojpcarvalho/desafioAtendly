import express from "express";
import userRouter from "./user.route";

const defaultRouter = express.Router();

defaultRouter.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

const routes = {
  defaultRouter,
  userRouter,
};

export default routes;

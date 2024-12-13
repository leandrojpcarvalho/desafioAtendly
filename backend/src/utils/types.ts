import { Router } from "express";
import routes from "../routes/index.route";

export type MapRoutes = {
  [key in keyof typeof routes]: Router;
};

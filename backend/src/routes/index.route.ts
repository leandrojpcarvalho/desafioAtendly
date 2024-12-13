import express from "express";

const defaultRouter = express.Router();

defaultRouter.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

const routes = {
  defaultRouter,
};

export default routes;

import express from "express";
import App from "./App";
import routes from "./routes/index.route";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const expressServer = express();

const server = new App(expressServer, routes);

server.start(Number(PORT));

export default server;

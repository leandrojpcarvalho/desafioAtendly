import express from "express";
import App from "./App";
import routes from "./routes/index.route";

const expressServer = express();

const server = new App(expressServer, routes);

server.start(3000);
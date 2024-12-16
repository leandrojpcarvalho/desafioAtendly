import express, { Express } from "express";
import { MapRoutes } from "./utils/types";
import ErrorHandler from "./layers/middleware/ErrorHandler";
import cors from "cors";
import routes from "./routes/index.route";

export default class AppBack {
  private server: Express;
  private routes: MapRoutes;

  constructor(express: Express, routes: MapRoutes) {
    this.server = express;
    this.routes = routes;
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(accessControl);
  }

  private startRoutes() {
    Object.values(this.routes).forEach((router) => {
      this.server.use(router);
    });
    this.server.use(ErrorHandler.errorHandler);
  }

  public static getInstance(exp = express(), router = routes): AppBack {
    return new AppBack(exp, router);
  }

  public start(port: number) {
    this.startRoutes();
    this.server.listen(port, () => {
      console.log("Server is running on port " + port);
      // sequelize.connectionManager.getConnection({ type: 'read' }).then(() => console.log('Database connected'));
    });
  }
}

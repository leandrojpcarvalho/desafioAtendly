import express, { Express } from "express";
import { MapRoutes } from "./utils/types";
import ErrorHandler from "./layers/middleware/ErrorHandler";
import cors from "cors";
import routes from "./routes/index.route";

export default class AppBack {
  public app: Express;
  private routes: MapRoutes;

  constructor(express: Express, routes: MapRoutes) {
    this.app = express;
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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private startRoutes() {
    Object.values(this.routes).forEach((router) => {
      this.app.use(router);
    });
    this.app.use(ErrorHandler.errorHandler);
  }

  public static getInstance(exp = express(), router = routes): AppBack {
    return new AppBack(exp, router);
  }

  public start(port: number) {
    this.startRoutes();
    this.app.listen(port, () => {
      console.log("server is running on port " + port);
      // sequelize.connectionManager.getConnection({ type: 'read' }).then(() => console.log('Database connected'));
    });
  }
}

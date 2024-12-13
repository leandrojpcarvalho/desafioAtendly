import { Keys } from "../utils/types.type";

const ADDRESS = process.env.ADDRESS || "http://localhost";
const PORT = process.env.PORT || 3000;

export enum ERoutes {
  login = "/login",
  register = "/register",
  profile = "/profile",
}

export type RoutesType = Keys<typeof ERoutes>;

export abstract class Routes {
  public static getRoute(
    route: RoutesType,
    type: "root" | "fetch" = "root"
  ): string {
    switch (type) {
      case "fetch":
        return this.routeMaker(route);
      default:
        return ERoutes[route];
    }
  }
  private static routeMaker(route: RoutesType): string {
    return `${ADDRESS}:${PORT}${ERoutes[route]}`;
  }
}

export default {
  ERoutes,
  Routes,
};

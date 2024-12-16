import { Keys } from "../utils/types.type";

const ADDRESS = "http://localhost";
const PORT = 3000;
const API_BASE = "/api";

export enum ERoutes {
  login = "/login",
  register = "/register",
  profile = "/profile",
  email = "/email",
}

export type RoutesType = Keys<typeof ERoutes>;

export abstract class Routes {
  public static getRoute(
    route: RoutesType,
    type: "root" | "fetch" = "root"
  ): string {
    switch (type) {
      case "fetch":
        return Routes.routeMaker(route);
      default:
        return API_BASE.concat(ERoutes[route]);
    }
  }
  private static routeMaker(route: RoutesType): string {
    return `${ADDRESS}:${PORT}${API_BASE}${ERoutes[route]}`;
  }
}

export default {
  ERoutes,
  Routes,
};

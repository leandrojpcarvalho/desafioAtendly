import { Request, Response, NextFunction, RequestHandler } from "express";
import Schemas from "./schema";
import { StatusCodes } from "http-status-codes";
import { ServiceHelpers } from "../../utils";

export default class MiddleWare {
  public static schemas = Schemas;

  public static validationMiddleware(
    route: keyof typeof Schemas,
    type: keyof (typeof Schemas)["user"]
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { error } = MiddleWare.schemas[route][type].validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      next();
    };
  }

  public static protectedMiddleware(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
      if (!authorization) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Voce precisa estar logado" });
        return;
      }
      if (ServiceHelpers.jwtValidation(authorization)) {
        next();
        return;
      }
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token invalido" });
      return;
    };
  }

  public static loginWithToken(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
      if (authorization && typeof authorization === "string") {
        const tokenDecoded = ServiceHelpers.decodeToken(authorization);
        if (tokenDecoded) {
          res.status(StatusCodes.OK).json(tokenDecoded);
          return;
        }
      }
      next();
    };
  }
}

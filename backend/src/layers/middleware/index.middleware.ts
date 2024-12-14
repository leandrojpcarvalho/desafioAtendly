import { Request, Response, NextFunction, RequestHandler } from "express";
import Schemas from "./schema";
import { StatusCodes } from "http-status-codes";
import { ServiceHelpers } from "../../utils";

export default class MiddleWare {
  public static schemas = Schemas;

  public static validationMiddleware(route: keyof typeof Schemas, type: keyof typeof Schemas['user']) {
    return (req: Request, res: Response, next: NextFunction) => {
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
      const [bearer, token] = authorization.split(" ");
      if (bearer !== "Bearer" || ServiceHelpers.jwtValidation(token)) {
        res.status(StatusCodes.UNAUTHORIZED).json("Token invalido");
        return;
      }
      next();
    };
  }
}

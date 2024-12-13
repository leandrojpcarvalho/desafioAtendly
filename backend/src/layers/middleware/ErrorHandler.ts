import { NextFunction, Request, Response } from "express";

export default abstract class ErrorHandler {
  public static errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(500).json({ error: err });
    return;
  }

  public static asyncErrorHandler(
    fn: (req: Request, res: Response) => Promise<void>
  ) {
    return (req: Request, res: Response, next: NextFunction): Promise<void> => {
      return fn(req, res).catch(next);
    };
  }
}
